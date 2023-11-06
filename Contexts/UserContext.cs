using Microsoft.EntityFrameworkCore;
using CloudDrop.Models;

namespace CloudDrop.Contexts
{
    public class UserContext : DbContext
    {
        private DbSet<User> Users { get; set; }

        public UserContext(DbContextOptions<UserContext> options) : base(options) { }

        public User? Attempt(string username, string token)
        {
            User? u = Users.FirstOrDefault(u => u.Name.Equals(username, StringComparison.InvariantCultureIgnoreCase));
            if (u == null) return null;
            
            return BCrypt.Net.BCrypt.Verify(token, u.TokenHash) ? u : null;
        }

        public User Add(string username, string token, string directoryPath, string[]? acceptedMimeTypes = null)
        {
            acceptedMimeTypes ??= new string[] { "images/*" };
            User u = new User()
            {
                Name = username,
                TokenHash = BCrypt.Net.BCrypt.HashPassword(token),
                DirectoryLocation = directoryPath
            };
            Users.Add(u);
            SaveChanges();

            return u;
        }

        public IList<User> All() => Users.ToList();
    }
}
