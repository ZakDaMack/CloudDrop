using Microsoft.AspNetCore.Mvc;
using CloudDrop.Contexts;
using CloudDrop.Models;
using System.Net;
using System.Text;

namespace CloudDrop.Controllers
{
    public class BaseController : ControllerBase
    {
        protected UserContext UserContext => HttpContext.RequestServices.GetService(typeof(UserContext)) as UserContext;

        protected User AuthenticateOrThrow()
        {
            User? u = Authenticate();
            if (u == null)
                throw new BadHttpRequestException("Authorization details are incorrect or Authorization header is missing", (int)HttpStatusCode.Unauthorized);

            return u;
        }

        protected User? Authenticate()
        {
            string authHeader = HttpContext.Request.Headers.Authorization.FirstOrDefault();
            if (String.IsNullOrEmpty(authHeader)) return null;

            string encodedUsernamePassword = authHeader.Substring("Basic ".Length).Trim();
            string usernamePassword = Encoding.GetEncoding("iso-8859-1").GetString(Convert.FromBase64String(encodedUsernamePassword));
            int seperatorIndex = usernamePassword.IndexOf(':');

            string username = usernamePassword.Substring(0, seperatorIndex);
            string password = usernamePassword.Substring(seperatorIndex + 1);
            return UserContext.Attempt(username, password);
        }
    }
}
