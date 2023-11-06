using System.ComponentModel.DataAnnotations;

namespace CloudDrop.Models
{
    public class User
    {
        // PROPERTIES
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string TokenHash { get; set; }
        public string DirectoryLocation { get; set; }
        public string AcceptedFileTypes { get; set; }

        //public User(string name, string tokenHash, string directoryLocation, string[] acceptedFileTypes)
        //{
        //    Name = name;
        //    TokenHash = tokenHash;
        //    DirectoryLocation = directoryLocation;
        //    AcceptedFileTypes = String.Join(',', acceptedFileTypes);
        //}

        //// GETTERS
        //public DirectoryInfo Dir => Directory.CreateDirectory(DirectoryLocation);
    }
}