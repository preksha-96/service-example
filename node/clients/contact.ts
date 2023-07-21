import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient, Apps } from '@vtex/api'


export default class Contact extends ExternalClient {
  private setting: any | boolean = false
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://trika.vtexcommercestable.com.br`, context, {
      ...options,
    })
  }
  public async getContactDetails() {
    const contactData = await this.http.get<Promise<any>>(
      `/api/dataentities/PC/search?_fields=firstname,lastname,email,subject,message,id,age&_schema=preksha`,
      await this.getHeaders()
    )

    return contactData
  }
  public async updateContactDetails(payload: any, id: string) {
    const updateContactData = await this.http.patch<Promise<any>>(
      `/api/dataentities/PC/documents/${id}`, payload,
      await this.getHeaders()
    )
    if (updateContactData) {
      return {
        success: true
      }
    } else {
      return updateContactData
    }

  }
  public async deleteContactDetails(id: string) {
    const deletecontact = await this.http.delete<Promise<any>>(
      `/api/dataentities/PC/documents/${id}`,
      await this.getHeaders()
    )
      return deletecontact
  }

  private async getHeaders() {
    const app = new Apps(this.context)
    this.setting = await app.getAppSettings(process.env.VTEX_APP_ID ?? '')
    console.log(this.setting)
    return {
      headers: {
        'Content-type': 'application/json',
        'X-VTEX-API-AppKey': this.setting?.apiKey,
        'X-VTEX-API-AppToken': this.setting?.appToken
      },
    }
  }
}
