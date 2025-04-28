import { BusRoute } from '../types';

export const busRoutes: BusRoute[] = [
  {
    id: 'R01',
    routeNo: 'R01',
    name: 'Ennore',
    startTime: '5:50 am',
    stops: [
      { id: 'R01-1', name: 'Ennore', time: '5:50 am' },
      { id: 'R01-2', name: 'College', time: '6:50 am' }
    ]
  },
  {
    id: 'R01A',
    routeNo: 'R01A',
    name: 'Tondiarpet',
    startTime: '6:17 am',
    stops: [
      { id: 'R01A-1', name: 'Tondiarpet', time: '6:17 am' },
      { id: 'R01A-2', name: 'College', time: '7:15 am' }
    ]
  },
  {
    id: 'R02',
    routeNo: 'R02',
    name: 'Triplicane',
    startTime: '6:00 am',
    stops: [
      { id: 'R02-1', name: 'Triplicane', time: '6:00 am' },
      { id: 'R02-2', name: 'College', time: '7:00 am' }
    ]
  },
  {
    id: 'R03',
    routeNo: 'R03',
    name: 'Choolai',
    startTime: '6:00 am',
    stops: [
      { id: 'R03-1', name: 'Choolai', time: '6:00 am' },
      { id: 'R03-2', name: 'College', time: '7:00 am' }
    ]
  },
  {
    id: 'R03A',
    routeNo: 'R03A',
    name: 'Collector Nagar',
    startTime: '6:50 am',
    stops: [
      { id: 'R03A-1', name: 'Collector Nagar', time: '6:50 am' },
      { id: 'R03A-2', name: 'College', time: '7:45 am' }
    ]
  },
  {
    id: 'R03B',
    routeNo: 'R03B',
    name: 'Water Tank',
    startTime: '6:40 am',
    stops: [
      { id: 'R03B-1', name: 'Water Tank', time: '6:40 am' },
      { id: 'R03B-2', name: 'College', time: '7:35 am' }
    ]
  },
  {
    id: 'R04',
    routeNo: 'R04',
    name: 'East Mugappair',
    startTime: '6:30 am',
    stops: [
      { id: 'R04-1', name: 'East Mugappair', time: '6:30 am' },
      { id: 'R04-2', name: 'College', time: '7:30 am' }
    ]
  },
  {
    id: 'R05',
    routeNo: 'R05',
    name: 'CIT Nagar',
    startTime: '6:10 am',
    stops: [
      { id: 'R05-1', name: 'CIT Nagar', time: '6:10 am' },
      { id: 'R05-2', name: 'College', time: '7:10 am' }
    ]
  },
  {
    id: 'R05A',
    routeNo: 'R05A',
    name: 'Loyola College',
    startTime: '6:40 am',
    stops: [
      { id: 'R05A-1', name: 'Loyola College', time: '6:40 am' },
      { id: 'R05A-2', name: 'College', time: '7:35 am' }
    ]
  },
  {
    id: 'R06',
    routeNo: 'R06',
    name: 'Chinmayanagar',
    startTime: '6:10 am',
    stops: [
      { id: 'R06-1', name: 'Chinmayanagar', time: '6:10 am' },
      { id: 'R06-2', name: 'College', time: '7:10 am' }
    ]
  }
  // Note: Additional routes can be added following the same pattern
];