import _ from 'lodash'
import { classOption } from 'utill'
import style from './index.module.scss'

import propTypes from 'prop-types'
import { useMemo } from 'react'

const classname = classOption(style)

/**@type {(props:{children: string, className: string})=>JSX.Element} */
function MyIcon({ children, className, ...otherProps }) {

  const text = useMemo(() => _(children).trim(), [children])
  const iconClass = useMemo(() => (text ? 'icon-' + text : ''), [text])

  return <i className={classname(['my-icon', iconClass, className])} {...otherProps}></i>
}

MyIcon.propTypes = {
  children: propTypes.string,
}

export default MyIcon
