import _ from 'lodash'
import { classOption } from 'utill'
import style from './index.module.scss'

import { useMemo, useState } from 'react'
import { animated, easings, useSpring } from 'react-spring'

const classname = classOption(style)

export default function SpringTest() {
  const [items, setItems] = useState([
    {
      value: 'test',
      position: 0,
      key: 'key-item-0',
    },
    {
      value: 'test-item',
      position: 1,
      key: 'key-item-1',
    },
    {
      value: 'just-item',
      position: 2,
      key: 'key-item-2',
    },
    {
      value: 'animation',
      position: 3,
      key: 'key-item-3',
    },
    {
      value: 'spring',
      position: 4,
      key: 'key-item-4',
    },
    {
      value: 'react',
      position: 5,
      key: 'key-item-5',
    },
  ])

  const spring = useSpring({
    from: {
      color: '#000',
      fontSize: '16px',
    },
    to: [
      {
        color: 'red',
        fontSize: '30px',
      },
      {
        color: '#000',
        fontSize: '16px',
      },
    ],
  })

  const displayItems = useMemo(() => {
    return _(items)
      .map(({ value, position, key }) => {
        return (
          <div className={classname('test-name')} key={key}>
            {value}
          </div>
        )
      })
      .value()
  }, [items])

  function shuffleBtnClick() {
    setItems(_(items).shuffle().value())
  }

  return (
    <div className={classname('main')}>
      <button onClick={shuffleBtnClick}>shuffle</button>
      <animated.div style={spring}>{displayItems}</animated.div>
      <br />
      <br />
    </div>
  )
}
