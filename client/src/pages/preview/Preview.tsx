import './Preview.scss';
import { Button } from '@chakra-ui/react';
import { LINKS, NOT_FOUND } from '../../data/navlinks';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import avatar from '../../assets/avatar-svgrepo-com.svg';
import { useAuth } from '../../store';
import { all } from '../../data/platforms';
import { axiosUser } from '../../utils';
import ChakraSpinner from '../../components/ChakraSpinner';
import { useEffect, useState } from 'react';
import { User } from '../../data/types';

interface Props {
  isPublic?: boolean;
}
function Preview({ isPublic }: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const params = useParams();
  const [userData, setUserData] = useState<User | null>(() => {
    return isPublic ? null : user;
  });

  const getUserById = async (userId: string) => {
    try {
      const response = await axiosUser(`/public/${userId}`);
      setUserData(() => response.data);
    } catch (err) {
      navigate(NOT_FOUND.path);
    }
  };

  useEffect(() => {
    if (isPublic) {
      getUserById(params.id!);
    }
  }, []);

  if (!userData) {
    return <ChakraSpinner />;
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(`https://devlinks-client.vercel.app/public-preview/${user?.id}`);
    toast.success('Copy to clipboard');
  };

  return (
    <div className="preview">
      <div className="container">
        {!isPublic && (
          <header>
            <nav>
              <ul>
                <li>
                  <Button
                    onClick={() => navigate(LINKS.path)}
                    variant="outline"
                    type="submit"
                    borderColor={'devlinks.--ac-cl-1'}
                    color={'devlinks.--ac-cl-1'}
                  >
                    Back to Editor
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={handleCopyClick}
                    type="submit"
                    colorScheme="purple"
                    backgroundColor={'devlinks.--ac-cl-1'}
                    color={'devlinks.--font-light'}
                  >
                    Copy Share Link
                  </Button>
                </li>
              </ul>
            </nav>
          </header>
        )}
        {/************************
              Profile Image 
         **************************/}
        <section className="profile-preview">
          {userData?.profileImage ? (
            <img src={userData?.profileImage} alt="profile image" className="profile-image" />
          ) : (
            <img src={avatar} alt="profile image" className="profile-image" />
          )}
          {/************************
                     Name 
          **************************/}
          <h2 className="name">
            {userData?.firstName} {userData?.lastName}
          </h2>
          {/************************
                    Email 
           **************************/}
          <p className="email">{userData?.email}</p>

          {/************************
                Links  
         **************************/}
          {userData?.bio && <p className="bio">{userData?.bio}</p>}
          <div className="links">
            {userData?.links &&
              userData?.links.map(({ url, platform }) => {
                const { icon, color } = all.get(platform)!;
                return (
                  <Button
                    _hover={{ boxShadow: '0 0  10px  5px   #beadff' }}
                    padding={'1.4rem'}
                    width={'100%'}
                    key={platform}
                    color="devlinks.--font-light"
                    backgroundColor={color}
                    top={url}
                    leftIcon={icon}
                    as="a"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {platform}
                  </Button>
                );
              })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Preview;
