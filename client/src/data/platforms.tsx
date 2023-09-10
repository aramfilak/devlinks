import { PlatForm } from './types';

import {
  SiGithub,
  SiCodewars,
  SiHashnode,
  SiLinkedin,
  SiCodepen,
  SiFreecodecamp,
  SiFrontendmentor,
  SiStackoverflow,
  SiGitlab,
  SiStackshare,
  SiFacebook,
  SiInstagram,
  SiYoutube,
  SiTwitch,
  SiTwitter,
  SiTiktok,
  SiReddit,
  SiSnapchat,
  SiPlaystation,
  SiXbox,
  SiDiscord,
  SiMiro,
  SiSlack,
  SiTelegram,
  SiGoogledrive,
  SiDropbox,
  SiDevdotto,
} from 'react-icons/si';

const dev: PlatForm[] = [
  { name: 'GitHub', icon: <SiGithub />, color: '#000000', url: 'https://github.com' },
  { name: 'Codewars', icon: <SiCodewars />, color: '#a93225', url: 'codewars.com' },
  { name: 'Hashnode', icon: <SiHashnode />, color: '#3067ff', url: 'https://hashnode.com' },
  { name: 'LinkedIn', icon: <SiLinkedin />, color: '#1a6bc4', url: 'linkedin.com' },
  { name: 'CodePen', icon: <SiCodepen />, color: '#231F20', url: 'https://codepen.io' },
  { name: 'FreeCodeCamp', icon: <SiFreecodecamp />, color: '#0A0A23', url: 'freecodecamp.org' },
  {
    name: 'Frontend Mentor',
    icon: <SiFrontendmentor />,
    color: '#333333',
    url: 'frontendmentor.io',
  },
  {
    name: 'Stack Overflow',
    icon: <SiStackoverflow />,
    color: '#f5842d',
    url: 'https://stackoverflow.com',
  },
  { name: 'Devdotto', icon: <SiDevdotto />, color: '#000', url: 'devdotto.com' },
  { name: 'GitLab', icon: <SiGitlab />, color: '#e24329', url: 'gitlab.com' },
  { name: 'Stackshare', icon: <SiStackshare />, color: '#008cf1', url: 'stackshare.io' },
];

const socialMedia: PlatForm[] = [
  { name: 'Facebook', icon: <SiFacebook />, color: '#425e9f', url: 'facebook.com' },
  { name: 'Instagram', icon: <SiInstagram />, color: '#ff4a5e', url: 'instagram.com' },
  { name: 'YouTube', icon: <SiYoutube />, color: '#ff1512', url: 'youtube.com' },
  { name: 'Twitch', icon: <SiTwitch />, color: '#8c44f7', url: 'twitch.tv' },
  { name: 'Twitter', icon: <SiTwitter />, color: '#198cd8', url: 'twitter.com' },
  { name: 'Tiktok', icon: <SiTiktok />, color: '#000', url: 'tiktok.com' },
  { name: 'Reddit', icon: <SiReddit />, color: '#ff4500', url: 'reddit.com' },
  { name: 'Snapchat', icon: <SiSnapchat />, color: '#ffd60a', url: 'snapchat.com' },
];

const gaming: PlatForm[] = [
  {
    name: 'Playstation',
    icon: <SiPlaystation />,
    color: '#003791',
    url: ' playstation.com',
  },
  { name: 'XBox', icon: <SiXbox />, color: '#107C10', url: 'xbox.com' },
];

const business: PlatForm[] = [
  { name: 'Discord', icon: <SiDiscord />, color: '#7289DA', url: 'discord.com' },
  { name: 'Miro', icon: <SiMiro />, color: '#ffd02f', url: 'miro.com' },
  { name: 'Slack', icon: <SiSlack />, color: '#4A154B', url: 'slack.com' },
  { name: 'Telegram', icon: <SiTelegram />, color: '#0088CC', url: 'telegram.org' },
];

const cloud: PlatForm[] = [
  { name: 'Google Drive', icon: <SiGoogledrive />, color: '#4285F4', url: 'google.com/drive' },
  { name: 'Dropbox', icon: <SiDropbox />, color: '#0061FF', url: 'dropbox.com' },
];

const all: Map<string, PlatForm> = new Map<string, PlatForm>();

[...dev, ...socialMedia, ...gaming, ...business, ...cloud].forEach((platform) => {
  all.set(platform.name, platform);
});

export { all, dev, socialMedia, gaming, business, cloud };
