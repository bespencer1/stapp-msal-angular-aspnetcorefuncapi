using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.Resource;
using msal_aspnetcoreapi;

namespace api
{
    public static class getAuthData
    {
        [Authorize]
        [RequiredScope("access_as_user")]
        [FunctionName("getAuthData")]
        public static async Task<ActionResult<IEnumerable<MyData>>> Run(
                [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
                ILogger log)
        {
          log.LogInformation("getData HTTP trigger function processed a request.");

          List<MyData> myData = new();
          foreach (var header in req.Headers)
          {
            myData.Add(new MyData { Name = header.Key, Value = header.Value });
          }

          return myData;
        }
    }
}
