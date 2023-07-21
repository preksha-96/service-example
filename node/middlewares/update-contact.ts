

import { json } from 'co-body'
import { msg } from '../utils/msg';

export async function updateContact(ctx: Context, next: () => Promise<any>) {
    try {
        const { id } = ctx.vtex.route.params
        const body = await json(ctx.req)
        const { clients: { contact } } = ctx
        const resp = await contact.updateContactDetails(body, id.toString())
        if (resp.data) {
            ctx.body = await contact.getContactDetails();
        }
        ctx.status = 200
        return next()
    } catch (e) {
        const err: any = e
        const message = err?.response && err?.response.data && err?.response.data.Message ? err?.response.data.Message : undefined;
        ctx.status = err?.response?.status || 400
        ctx.body = msg(ctx, 'error', message || 'Error')
        return next()
    }
}
export async function deleteContact(ctx: Context, next: () => Promise<any>) {
   try{
    const { id } = ctx.vtex.route.params
    const { clients: { contact } } = ctx
    const data = await contact.deleteContactDetails(id.toString())
    ctx.body = data
    return next()
   }catch (err){
    const message = err?.response && err?.response.data && err?.response.data.Message ? err?.response.data.Message : undefined;
    ctx.status = err?.response?.status || 400
    ctx.body = msg(ctx, 'error', message || 'Error')
    return next()
   }
}

