/**@typedef {{[x:string]: boolean}} option_obj */
/**@typedef {(string|number|option_obj)[]} option_arr */
/**@typedef {string|number|option_arr|option_obj} option */

/**@type {(style:{[x:string]:string})=>(...options:option[])=>string} */
export const classOption = (style={}) => {
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
            let temp = Object.entries(v)
              .filter(([x, bool]) => bool)
              .map(([x, bool]) => x)

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
          let temp = Object.entries(v)
            .filter(([x, bool]) => bool)
            .map(([x, bool]) => x)

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
