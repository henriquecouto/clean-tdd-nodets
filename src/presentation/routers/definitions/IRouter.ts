import HttpRequest from '@/presentation/helpers/HttpRequest'
import HttpResponse from '@/presentation/helpers/HttpResponse'

interface IRouter {
  route: (httpRequest: HttpRequest) => Promise<HttpResponse>
}

export default IRouter
