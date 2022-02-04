import Head from 'next/head'
import Image from 'next/image'
import { classOption } from '@/utill'
import style from '@/styles/index.module.scss'

const classname = classOption(style)

export default function Home() {
  let p = ['hi', 'hello']
  return (
    <div className={classname(p, { test: true })}>
      <div className={classname('wow')}></div>
    </div>
  )
}
