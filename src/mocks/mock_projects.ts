import { Project } from '../app/features/projects/models/project.interface';
import { ProjectCategory } from '../app/features/projects/components/project-card/project-category/project-category.enum';

export const mockedData: Project[] = [
  {
    id: 1,
    ownerId: 123,
    title: 'Python Personal Project',
    imageScr:
      'https://s.dou.ua/CACHE/images/img/static/companies/NEW_360x160_logo_Ukraine_/79d9e7b8ef5671daeb650256e256411b.png',
    description:
      'Down room whether bit fill factor seat chance upon training specific five expect pay.',
    category: ProjectCategory.DataScience,
    participants: [
      {
        userId: 884,
        imageSrc: 'https://placekitten.com/439/451',
        userName: 'michaelanderson',
      },
      {
        userId: 753,
        imageSrc: 'https://www.lorempixel.com/820/660',
        userName: 'aguilarjonathan',
      },
      {
        userId: 648,
        imageSrc: 'https://placeimg.com/980/415/any',
        userName: 'ramseyhelen',
      },
      {
        userId: 866,
        imageSrc: 'https://placekitten.com/395/547',
        userName: 'harveysean',
      },
      {
        userId: 850,
        imageSrc: 'https://placekitten.com/822/706',
        userName: 'webercynthia',
      },
    ],
  },
  {
    id: 2,
    ownerId: 1,
    title: 'Python Community Project',
    description: 'Nice others interesting once seat life.',
    category: ProjectCategory.WebDevelopment,
    participants: [
      {
        userId: 974,
        imageSrc: 'https://www.lorempixel.com/93/753',
        userName: 'hamiltonbrian',
      },
      {
        userId: 25,
        imageSrc: 'https://dummyimage.com/527x340',
        userName: 'allisonjoseph',
      },
    ],
  },
  {
    id: 3,
    ownerId: 1,
    title: 'Unity Personal Project',
    description:
      'Suggest executive race clearly home southern lay very group appear threat.',
    category: ProjectCategory.GameDevelopment,
    participants: [
      {
        userId: 763,
        imageSrc: 'https://placekitten.com/698/915',
        userName: 'aaronporter',
      },
      {
        userId: 757,
        imageSrc: 'https://dummyimage.com/50x0',
        userName: 'martingraham',
      },
      {
        userId: 748,
        imageSrc: 'https://placekitten.com/569/825',
        userName: 'tylerross',
      },
    ],
  },
  {
    id: 4,
    ownerId: 1,
    title: 'JavaScript Personal Project',
    description:
      'Throughout we say wife big listen experience skill walk population those federal.',
    category: ProjectCategory.MobileApp,
    participants: [
      {
        userId: 229,
        imageSrc: 'https://www.lorempixel.com/441/89',
        userName: 'silvaricky',
      },
      {
        userId: 815,
        imageSrc: 'https://dummyimage.com/837x710',
        userName: 'madisonhall',
      },
    ],
  },
  {
    id: 5,
    ownerId: 1,
    title: 'Unity Community Project',
    description: 'Charge hour yeah like the husband middle type.',
    category: ProjectCategory.MachineLearning,
    participants: [
      {
        userId: 252,
        imageSrc: 'https://placeimg.com/727/761/any',
        userName: 'anthony02',
      },
      {
        userId: 604,
        imageSrc: 'https://www.lorempixel.com/833/879',
        userName: 'moorekevin',
      },
      {
        userId: 847,
        imageSrc: 'https://placeimg.com/997/7/any',
        userName: 'schwartzluis',
      },
    ],
  },
  {
    id: 6,
    ownerId: 1,
    title: 'C# Educational',
    description:
      'Sit ok machine discussion create grow hear particularly deep style always government.',
    category: ProjectCategory.GameDevelopment,
    participants: [
      {
        userId: 134,
        imageSrc: 'https://placeimg.com/856/589/any',
        userName: 'thomaswise',
      },
      {
        userId: 712,
        imageSrc: 'https://placekitten.com/565/777',
        userName: 'lynchricardo',
      },
      {
        userId: 251,
        imageSrc: 'https://www.lorempixel.com/872/600',
        userName: 'justin91',
      },
      {
        userId: 881,
        imageSrc: 'https://placeimg.com/41/600/any',
        userName: 'samuel68',
      },
    ],
  },
  {
    id: 7,
    ownerId: 123,
    imageScr:
      'https://s.dou.ua/CACHE/images/img/static/companies/logo_vector-01/c9e79338ccbc36bd7326a06693bfbc2c.png',
    title: 'React Startup Idea',
    description: 'Save film very down easy worker land point must.',
    category: ProjectCategory.MachineLearning,
    participants: [
      {
        userId: 12,
        imageSrc: 'https://dummyimage.com/1008x830',
        userName: 'crystalbradley',
      },
      {
        userId: 143,
        imageSrc: 'https://placekitten.com/193/410',
        userName: 'colemanjack',
      },
      {
        userId: 895,
        imageSrc: 'https://placekitten.com/58/114',
        userName: 'wilcoxchristine',
      },
    ],
  },
  {
    id: 8,
    ownerId: 123,
    imageScr:
      'https://s.dou.ua/CACHE/images/img/static/companies/Logo_GL-Hitachi_Black/d1dc877c72c8c53613fa0883a2290e8d.png',
    title: 'Unity Educational',
    description: 'Nice industry ball every PM however unit lose especially up.',
    category: ProjectCategory.GameDevelopment,
    participants: [
      {
        userId: 922,
        imageSrc: 'https://placeimg.com/672/573/any',
        userName: 'katelyn23',
      },
      {
        userId: 505,
        imageSrc: 'https://placeimg.com/489/56/any',
        userName: 'russell21',
      },
      {
        userId: 182,
        imageSrc: 'https://placekitten.com/841/413',
        userName: 'larry27',
      },
      {
        userId: 914,
        imageSrc: 'https://placekitten.com/649/85',
        userName: 'sandraweber',
      },
    ],
  },
  {
    id: 9,
    ownerId: 1,
    title: 'C# Personal Project',
    description: 'Side anyone moment house blood high compare teacher stage.',
    category: ProjectCategory.DataScience,
    participants: [
      {
        userId: 94,
        imageSrc: 'https://dummyimage.com/728x289',
        userName: 'jessica22',
      },
      {
        userId: 726,
        imageSrc: 'https://dummyimage.com/735x632',
        userName: 'heather66',
      },
      {
        userId: 542,
        imageSrc: 'https://www.lorempixel.com/821/1018',
        userName: 'angela57',
      },
    ],
  },
];
