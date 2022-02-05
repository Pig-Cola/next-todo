import _ from 'lodash'
import style from './index.module.scss'
import { classOption } from 'utill'
import MyIcon from 'component/myIcon'

import Head from 'next/head'
import { Fragment, useEffect, useMemo, useState } from 'react'

const classname = classOption(style)

export default function Home() {
  // data
  const [todosData, setTodosData] = useState([
    {
      title: '안녕',
      position: 0,
      key: 'todo-key-0',
    },
    {
      title: '바보',
      position: 1,
      key: 'todo-key-1',
    },
    {
      title: '잘가',
      position: 2,
      key: 'todo-key-2',
    },
    {
      title: '어서와',
      position: 3,
      key: 'todo-key-3',
    },
  ])
  // mounted
  useEffect(() => {}, [])

  // memo
  const todos = useMemo(() => {
    return _(todosData)
      .orderBy(['position'], ['asc'])
      .map(({ title, position, key }) => {
        let upClick = (e) => {
          swapUp(e, position)
        }
        let downClick = (e) => {
          swapDown(e, position)
        }

        return (
          <div className={classname('todo-item')} key={key}>
            <div className={classname('position')}>
              <MyIcon className={classname('up')} onClick={upClick}>
                circle-up
              </MyIcon>
              <MyIcon className={classname('down')} onClick={downClick}>
                circle-down
              </MyIcon>
            </div>
            <div className={classname('todo-title')}>{title}</div>
            <div className={classname('todo-description')}>{`${title}-의 설명`}</div>
          </div>
        )
      })
      .value()
  }, [todosData])

  const todosDataMap = useMemo(() => {
    return _(todosData).keyBy('position').value()
  }, [todosData])

  // methods
  /**@type {import('react').ReactEventHandler} */
  function swapUp(e, position) {
    if (position <= 0) {
      return
    }
    let temp = _(todosData)
      .map(({ position: p, ...rest }) => {
        let targetP = p
        if (position === p) {
          targetP = p - 1
        } else if (position - 1 === p) {
          targetP = position
        }

        return { ...rest, position: targetP }
      })
      .value()
    setTodosData(temp)
  }

  /**@type {import('react').ReactEventHandler} */
  function swapDown(e, position) {
    if (position >= todosData.length - 1) {
      return
    }
    let temp = _(todosData)
      .map(({ position: p, ...rest }) => {
        let targetP = p
        if (position === p) {
          targetP = p + 1
        } else if (position + 1 === p) {
          targetP = position
        }

        return { ...rest, position: targetP }
      })
      .value()
    setTodosData(temp)
  }

  //render
  return (
    <>
      <Head>
        <title>Todo - List</title>
      </Head>

      <div className={classname('main')}>
        <div className={classname('todo-list-area')}>
          <div className={classname('title')}>Todo List</div>
          <div className={classname('todos')}>{todos}</div>
        </div>
      </div>
    </>
  )
}
