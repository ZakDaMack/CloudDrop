using Microsoft.AspNetCore.Mvc;
using CloudDrop.Models;
using CloudDrop.Utils;

namespace CloudDrop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileController : BaseController
    {
        private readonly ILogger<FileController> _logger;

        public FileController(ILogger<FileController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public ActionResult Index()
        {
            User u = UserContext.All()[0];
            return Ok(new
            {
                Status = "OK",
                AuthEnabled = true,
                User = u.Name + ":" + u.TokenHash
            });
        }

        [HttpPost]
        public ActionResult Upload([FromForm] FormRequest request)
        {
            User u = AuthenticateOrThrow();

            try
            {
                //if (file.ContentType)
                string path = FileHelper.GetUniquePath(Path.Combine(u.DirectoryLocation, request.file.FileName));
                Directory.CreateDirectory(u.DirectoryLocation);
                Console.WriteLine(path);
                using (Stream s = new FileStream(path, FileMode.Create))
                    request.file.CopyTo(s);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}