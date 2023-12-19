using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

public class KeyGenerator
{
    public static void Main()
    {
        // Generate RSA keys
        string publicKey;
        string privateKey;

        GenerateRSAKeys(out publicKey, out privateKey);

        // Save keys to files
        SaveToFile("public_key.pem", publicKey);
        SaveToFile("private_key.pem", privateKey);

        Console.WriteLine("Keys saved to files: public_key.txt, private_key.txt");

        Console.ReadLine();
    }

    public static void GenerateRSAKeys(out string publicKey, out string privateKey)
    {
        using (RSACryptoServiceProvider rsa = new RSACryptoServiceProvider(2048))
        {
            // Get public key
            publicKey = rsa.ToXmlString(false);

            // Get private key
            privateKey = rsa.ToXmlString(true);
        }
    }

    public static void SaveToFile(string fileName, string content)
    {
        File.WriteAllText(fileName, content);
    }
}
