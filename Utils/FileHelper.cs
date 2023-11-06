namespace CloudDrop.Utils
{
    public static class FileHelper
    {
        public static bool IsPathUnique(string path)
        {
            return !File.Exists(path);
        }

        public static string GetUniquePath(string path, int iteration = 0)
        {
            Console.WriteLine(iteration);
            string alteredPath = (iteration > 0) ? 
                Path.Combine(Path.GetDirectoryName(path), $"{Path.GetFileNameWithoutExtension(path)} ({iteration}){Path.GetExtension(path)}") : 
                path;
            return IsPathUnique(alteredPath) ? alteredPath : GetUniquePath(path, iteration + 1);
        }
    }
}
