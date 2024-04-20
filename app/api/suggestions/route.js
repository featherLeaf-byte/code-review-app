import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

export async function POST(req) {
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
