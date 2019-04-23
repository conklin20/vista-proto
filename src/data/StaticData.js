import { DateTime } from 'luxon';
import { convertToShortDate } from '../helpers/dateHelpers';
import { whatHappeneds } from './Incidents.js'
import { actions } from './Actions.js'

export const staticData = {
  lookupData: {
    valueStreams: [
      {
        name: 'Centerfire',
        abbr: 'CF', 
        backgroundColor: '#001f3f',
        departments: [
          {
            number: 4262,
            name: 'Plating',
            abbr: 'PLAT',
            backgroundColor: '#0074D9',
          },
          {
            number: 4303,
            name: 'Assembly',
            abbr: 'CFAA',
            backgroundColor: '#7FDBFF',
          },
          {
            number: 4212,
            name: 'Bullet Manufacturing',
            abbr: 'BMFG',
            backgroundColor: '#39CCCC',
          },
          {
            number: 4213,
            name: 'Bullet Packaging',
            abbr: 'BPKG',
            backgroundColor: '#3D9970',
          }
        ]
      },
      {
        name: 'Rimfire',
        abbr: 'RF', 
        backgroundColor: '#2ECC40',
        departments: [
          {
            number: 4231,
            name: 'Rimfire Metal Parts',
            abbr: 'RFMP',
            backgroundColor: '#01FF70',
          },
          {
            number: 4433,
            name: 'Rimfire Priming',
            abbr: 'RFPR',
            backgroundColor: '#FFDC00',
          },
          {
            number: 4234,
            name: 'Rimfire Assembly',
            abbr: 'RFAA',
            backgroundColor: '#FF851B',
          }
        ]
      }, 
      {
        name: 'Primers',
        abbr: 'PR', 
        backgroundColor: '#FF4136',
        departments: [
          {
            number: 4438,
            name: 'Tracer',
            abbr: 'TRCR',
            backgroundColor: '#85144b',
          },
          {
            number: 4439,
            name: 'Chemistry',
            abbr: 'CHEM',
            backgroundColor: '#F012BE',
          },
          {
            number: 4441,
            name: 'Primer Metal Parts',
            abbr: 'PMP',
            backgroundColor: '#B10DC9',
          },
          {
            number: 4442,
            name: 'Primer Assembly',
            abbr: 'PA',
            backgroundColor: '#967bb6',
          }
        ]
      }
    ],
    names: [
      'Bob Berthiaume', 'Rachel Carter','Brandon Davis','Jerry Miller','Jean Martinez','Nicole Bryant','Ralph Thomas','Dennis Cox','Willie Wilson','Robert Martin','Lawrence Mitchell','Bonnie Stewart','Patricia Wright',
      'Samuel Evans','Arthur Young','Melissa Ramirez','Walter Jenkins','Nicholas Hall','Janice Powell','Mary Morgan','Donald Gonzalez','Kenneth Hughes','Sean Russell','Philip Turner','Maria Bennett','Daniel Long',
      'Rebecca Ward','Jack Scott','Justin Taylor','Timothy Moore','Amanda Nelson','Michelle Collins','Nancy Parker','Judith Brown','Lisa Butler','Ruth Rogers','Annie Walker','Jose Gray','Norma Coleman','Gary Perez',
      'Andrea Bell','Virginia Sanchez','Ronald Phillips','Harold Hernandez','Eugene Gonzales','Louise Rodriguez','Gerald Griffin','Carl James','Kathy Wood','Marie Smith','Matthew Howard',
      ], 
    incidentTypes: [`DART `,`TRR`,`First Aid  `,`Initiation / Fire`,`Unusual Event`, `Near Miss`,`Prop. Damage`,`TSCA`,`Forklift Incident`, `Chemical Release`],
    employees: [],
    jobs: [`Administration`, `Assembler II`,    `Assembler III`,    `Ballistics Tech`,    `Charger`,    `Chemical Worker`,    `CI Rotational Employee`,    `Clean Up Worker`,    `CMV Operator`,    `Copper Plater`,    `Electrician`,    `Eng. Tech`,    `Engineer`,    `Env. Dept. Operator`,    `Gold Dot Insp.`,    `HVAC Mechanic`,    `Inspector`,    `Janitor`,    `Lab Technician`,    `Machine Operator`,    `Machine Tool Operator`,    `Machinist`,`Materials Handler`, `Millwright`,   `Nickel Plater`,    `Packager`,    `Pipe Fitter`,    `Security Guard`,    `Set Up Asst.`,    `Set Up Worker`,    `Supervisor`,    `Tech Coordinator`,    `Temp Assembler II`,    `Temp Assembler III`,    `Temp Packager`,    `Waste Treatment Operator`]
  },
  incidents: [], 
  daySinceLastReport: [], 
  openIncidentByDeptReport: []
}

function popIncidents(){
  const numIncident = 100;
  const lookupData = staticData.lookupData; 
  for(let i=1; i<=numIncident;i++){
    let incNumber = Math.floor(100000 + Math.random() * 900000)
    let ranVS = Math.floor(Math.random() * lookupData.valueStreams.length)
    let ranDateOccurred = getRandomDate(); 
    // let filteredDates = lookupData.dates.filter(date => date > lookupData.dates[ranDateOccurred])
    let ee = lookupData.employees[Math.floor(Math.random() * lookupData.employees.length)];
    staticData.incidents.push(
      {
        number: incNumber, 
        status: incNumber > 980000 ? 'Draft' : 'Submitted', 
        description: whatHappeneds[Math.floor(Math.random() * whatHappeneds.length)], 
        type: lookupData.incidentTypes[Math.floor(Math.random() * lookupData.incidentTypes.length)],
        dateOccurred: ranDateOccurred,
        valueStream: {
          name: lookupData.valueStreams[ranVS].name,
          abbr: lookupData.valueStreams[ranVS].abbr
        },
        department: lookupData.valueStreams[ranVS].departments[Math.floor(Math.random() * lookupData.valueStreams[ranVS].departments.length)],
        ee: {...ee},
        actions: [
          {
            number: Math.floor(1000 + Math.random() * 9000),
            actionDesc: actions[Math.floor(Math.random() * actions.length)], 
            assignedTo: {...lookupData.employees[Math.floor(Math.random() * lookupData.employees.length)]}, 
            ecd: getRandomDate(), 
            cd: getRandomDate(-90, 0),
            approved: true
          }, 
          {
            number: Math.floor(1000 + Math.random() * 9000),
            actionDesc: actions[Math.floor(Math.random() * actions.length)], 
            assignedTo: {...lookupData.employees[Math.floor(Math.random() * lookupData.employees.length)]}, 
            ecd: getRandomDate(), 
            cd: getRandomDate(-15, 0),
            approved: false
          }, 
          {
            number: Math.floor(1000 + Math.random() * 9000),
            actionDesc: actions[Math.floor(Math.random() * actions.length)], 
            assignedTo: {...lookupData.employees[Math.floor(Math.random() * lookupData.employees.length)]},
            ecd: getRandomDate(), 
            cd: null, 
            approved: false
          }
        ]
      }
    )
  }
}

function popDaysSinceReport(){
  const lookupData = staticData.lookupData; 
  lookupData.valueStreams.forEach(vs => {
    vs.departments.forEach(d =>{
      staticData.daySinceLastReport.push({
        valueStream: vs.name, 
        departmentNo: d.number, 
        department: d.abbr, 
        daySinceTRR: Math.floor(Math.random() * 365)
      })
    })
  })
}

function popOpenIncidentsReport(){  
  const lookupData = staticData.lookupData; 
  lookupData.valueStreams.forEach(vs => {
    vs.departments.forEach(d =>{
      staticData.openIncidentByDeptReport.push({
        valueStream: vs.name, 
        departmentNo: d.number, 
        department: d.abbr, 
        openIncidents: Math.floor(Math.random() * 15)
      })
    })
  })
}

function popEmployees(){
  const lookupData = staticData.lookupData; 
  const managers = lookupData.names.slice(0,5); 
  lookupData.names.forEach(name => {
    staticData.lookupData.employees.push({
      name: name, 
      id: Math.floor(Math.random() * (99999 - 30000) + 30000), 
      manager: managers[Math.floor(Math.random() * managers.length)]
    })
  });
}

function getRandomDate(min = -90, max = 90){
  let now = DateTime.local(); 
  let addDays = Math.floor(Math.random() * (max - min) + min);
  now = now.plus({days: addDays})
  now = convertToShortDate(now); 
  return now;
}

popEmployees(); 
popIncidents();
popDaysSinceReport(); 
popOpenIncidentsReport(); 
