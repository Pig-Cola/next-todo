import _ from 'lodash'

/**@typedef {{[x:string]: boolean}} option_obj */
/**@typedef {(string|number|option_obj)[]} option_arr */
/**@typedef {string|number|option_arr|option_obj} option */

/**
 * @type {(style:{[x:string]:string})=>(...options:option[])=>string}
 * 
 * #### ex)
 * ``` jsx
 * import { classOption } from '~~'
 * import style from '~~.module.css'
 * const classname = classOption(style)
 * 
 * ...
 * 
 * <div className={classname({isRed: true})}></div>
 * ```
 */

export const classOption = (style = {}) => {
  return (...options) => {
    let result = []
    options.forEach((v) => {
      switch (typeof v) {
        case 'string': {
          result.push(v)
          break
        }
        case 'number': {
          result.push(v.toString())
          break
        }
        case 'object': {
          if (!Array.isArray(v)) {
            let temp = _(v)
              .toPairs()
              .filter(([x, bool]) => bool)
              .map(([x, bool]) => x)
              .value()

            result.push(...temp)
          } else {
            result.push(...classOptionArr(v))
          }
          break
        }
        default: {
          break
        }
      }
    })

    return result.map((v) => style[v] || v).join(' ')
  }
}

/**@type {(optionArr:option_arr)=>string[]} */
function classOptionArr(optionArr) {
  let result = []
  optionArr.forEach((v) => {
    switch (typeof v) {
      case 'string': {
        result.push(v)
        break
      }
      case 'number': {
        result.push(v.toString())
        break
      }
      case 'object': {
        if (!Array.isArray(v)) {
          let temp = _(v)
          .toPairs()
          .filter(([x, bool]) => bool)
          .map(([x, bool]) => x)
          .value()

          result.push(...temp)
        }
        break
      }
      default: {
        break
      }
    }
  })

  return result
}
