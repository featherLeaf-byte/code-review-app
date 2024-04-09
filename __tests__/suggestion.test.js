const { NextResponse } = require('next/server')
const OpenAI = require('openai')

jest.mock('openai')

async function POST(req) {
  const OPENAI_KEY = process.env.OPENAI_API_KEY
  const code = await req.json()
  if (!code) {
    return NextResponse.json({ message: 'No code' }, { status: 401 })
  }
  const openai = new OpenAI(OPENAI_KEY)
  try {
    const completetions = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are a complex, sophisticated code reviewer who can analyze code and' +
            'generate intelligent code review suggestions and explanations based on best practices' +
            'potential optimizations, and common pitfalls',
        },
        {
          role: 'user',
          content: `Suggest improvements for the following code: ${code}`,
        },
      ],
      model: 'gpt-3.5-turbo',
    })

    const result = completetions.choices[0].message.content
    return NextResponse.json({ result })
  } catch (error) {
    return NextResponse.json(
      { message: 'The request failed...' },
      { status: 500 }
    )
  }
}

describe('POST /api/suggestions', () => {
  it('should return an error for missing code', async () => {
    const req = new Request(new URL('http://localhost:3000/api/suggestions'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(null),
    })
    const res = await POST(req)
    const data = await res.json()
    expect(data).toEqual({ message: 'No code' })
    expect(res.status).toBe(401)
  })

  it('should call OpenAI and return the completion result', async () => {
    const mockCompletion = {
      choices: [
        {
          message: { content: 'This code looks good, but...' },
        },
      ],
    }
    OpenAI.mockReturnValue({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValueOnce(mockCompletion),
        },
      },
    })

    const req = new Request(new URL('http://localhost:3000/api/suggestions'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: 'System.out.println("Hello World")' }),
    })

    const res = await POST(req)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data).toEqual({ result: 'This code looks good, but...' })
    expect(OpenAI).toHaveBeenCalledWith(process.env.OPENAI_API_KEY)
  })

  it('should handle errors and return a 500 status code', async () => {
    jest.mock('openai', () => {
      return {
        chat: {
          completions: {
            create: jest.fn(),
          },
        },
      }
    })
    const req = new Request(new URL('http://localhost:3000/api/suggestions'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: 'System.out.println("Hello World");' }),
    })

    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(500)
    expect(data).toEqual({ message: 'The request failed...' })
  })
})
