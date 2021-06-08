using API.Entity;

namespace API.Interfaces
{
    //Interface for JWT
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}