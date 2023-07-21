export const msg = (
    ctx: Context,
    type: 'info' | 'warning' | 'error',
    message: string,
    options?: Record<string, string>
  ) => {
    console.log(options,'smsksmksmkmk')
    if(!ctx) {
      return {type}
    }
    return {
      type,
      message: options ? message : ctx.message
    }
  }
  
  