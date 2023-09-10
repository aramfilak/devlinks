import { all } from '../data/platforms';
import { DevLink } from '../data/types';
import { useAuth } from '../store';
import avatar from '../assets/avatar-svgrepo-com.svg';

function PhoneMockup() {
  const { user } = useAuth();

  const renderedLinks = () => {
    const links: DevLink[] = user?.links || [];

    const result: JSX.Element[] = [];
    for (let i = 0; i < 5; i++) {
      if (i < links.length) {
        const link = all.get(links[i].platform)!;

        result.push(
          <foreignObject key={link?.name || ''} width="237" height="44" x="35" fill="#EEE" rx="8" y={278 + i * 64}>
            <a
              href={links[i].url}
              style={{
                backgroundColor: link?.color || '',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem',
                color: '#fff',
                borderRadius: '0.5rem',
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link?.icon || ''}
              <p style={{ color: '#fff ' }}>{links[i].platform}</p>
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path
                  fill="currentColor"
                  d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"
                />
              </svg>
            </a>
          </foreignObject>,
        );
      } else {
        result.push(<rect key={i} width="237" height="44" x="35" y={278 + i * 64} fill="#EEE" rx="8" />);
      }
    }
    return result;
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="308" height="632" fill="none" viewBox="0 0 308 632">
      <path
        stroke="#737373"
        d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
      />
      <path
        fill="#fff"
        stroke="#737373"
        d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
      />
      {/******************************************** */}
      {/*************** Phone Outline ************** */}
      {/******************************************** */}

      {user?.profileImage ? (
        <svg width="300" height="300">
          <defs>
            <clipPath id="clipCircle">
              <circle cx="153.5" cy="112" r="48" />
            </clipPath>
          </defs>
          <image href={user.profileImage} x="105.5" y="64" width="96" height="96" clipPath="url(#clipCircle)" />
        </svg>
      ) : (
        <svg width="300" height="300">
          <defs>
            <clipPath id="clipCircle">
              <circle cx="153.5" cy="112" r="48" />
            </clipPath>
          </defs>
          <image href={avatar} x="105.5" y="64" width="96" height="96" clipPath="url(#clipCircle)" />
        </svg>
      )}

      {/******************************************** */}
      {/******************** Name ****************** */}
      {/******************************************** */}
      {user?.firstName || user?.lastName ? (
        <foreignObject x="0" y="185" width="100%" height="32" rx="4">
          <p
            style={{
              textAlignLast: 'center',
              fontWeight: 'bold',
              fontSize: '1.25rem',
              color: '#333',
            }}
          >
            {user.firstName} {user.lastName}
          </p>
        </foreignObject>
      ) : (
        <rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8" />
      )}

      {/******************************************** */}
      {/******************** Email ***************** */}
      {/******************************************** */}
      {user?.email ? (
        <foreignObject x="0" y="208" width="100%" height="32" rx="4">
          <p style={{ textAlignLast: 'center' }}>{user.email}</p>
        </foreignObject>
      ) : (
        <rect width="72" height="8" x="117.5" y="214" fill="#EEE" rx="4" />
      )}
      {/******************************************** */}
      {/******************** Links ***************** */}
      {/******************************************** */}
      {renderedLinks()}
    </svg>
  );
}

export default PhoneMockup;
