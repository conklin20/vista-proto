export const staticData = {
  valueStreams: [
    {
      name: 'Centerfire',
      abbr: 'CF', 
      departments: [
        {
          number: 4304,
          name: 'Centerfire Assembly'
        },
        {
          number: 4303,
          name: 'Centerfire Metal Parts'
        },
        {
          number: 4301,
          name: 'Blazer Metal Parts'
        }
      ]
    },
    {
      name: 'Rimfire',
      abbr: 'RF', 
      departments: [
        {
          number: 4204,
          name: 'Rimfire Assembly'
        },
        {
          number: 4203,
          name: 'Rimfire Metal Parts'
        }
      ]
    }, 
    {
      name: 'Primers',
      abbr: 'PR', 
      departments: [
        {
          number: 4304,
          name: 'Primer Assembly'
        },
        {
          number: 4231,
          name: 'Primer Metal Parts'
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
  incidentTypes: ['TRR','Near Miss','First Aid'],
  dates: [
    '1/1/2019',  '1/4/2019',  '1/7/2019',  '1/10/2019',  '1/13/2019',  '1/16/2019',  '1/19/2019',  '1/22/2019',  '1/25/2019',  '1/28/2019',  '1/31/2019',  '2/3/2019',  '2/6/2019',  '2/9/2019',  '2/12/2019',  '2/15/2019',
    '2/18/2019',  '2/21/2019',  '2/24/2019',  '2/27/2019',  '3/2/2019',  '3/5/2019',  '3/8/2019',  '3/11/2019',  '3/14/2019',  '3/17/2019',  '3/20/2019',  '3/23/2019',  '3/26/2019',  '3/29/2019',  '4/1/2019',  '4/4/2019',  '4/7/2019',
    '4/10/2019',  '4/13/2019',  '4/16/2019',  '4/19/2019',  '4/22/2019',  '4/25/2019',  '4/28/2019',  '5/1/2019',  '5/4/2019',  '5/7/2019',  '5/10/2019',  '5/13/2019',  '5/16/2019',  '5/19/2019',  '5/22/2019',  '5/25/2019',  '5/28/2019'
  ],
  incidents: [], 
  daySinceLastReport: [], 
  openIncidentByDeptReport: []
}

function popIncidents(){
  const numIncident = 100;
  for(let i=1; i<=numIncident;i++){
    let ranVS = Math.floor(Math.random() * staticData.valueStreams.length)
    let ranDateOccured = Math.floor(Math.random() * staticData.dates.length)
    let filteredDates = staticData.dates.filter(date => date > staticData.dates[ranDateOccured])
    staticData.incidents.push(
      {
        number: Math.floor(100000 + Math.random() * 900000), 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
        type: staticData.incidentTypes[Math.floor(Math.random() * staticData.incidentTypes.length)],
        dateOccured: staticData.dates[ranDateOccured],
        valueStream: {
          name: staticData.valueStreams[ranVS].name,
          abbr: staticData.valueStreams[ranVS].abbr
        },
        department: staticData.valueStreams[ranVS].departments[Math.floor(Math.random() * staticData.valueStreams[ranVS].departments.length)],
        ee: staticData.names[Math.floor(Math.random() * staticData.names.length)],
        actions: [
          {
            actionDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', 
            assignedTo: staticData.names[Math.floor(Math.random() * (staticData.names.length / 5))], 
            ecd: filteredDates[Math.floor(Math.random() * filteredDates.length)], 
            cd: filteredDates[Math.floor(Math.random() * filteredDates.length)] 
          }, 
          {
            actionDesc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
            assignedTo: staticData.names[Math.floor(Math.random() * (staticData.names.length / 5))], 
            ecd: filteredDates[Math.floor(Math.random() * filteredDates.length)], 
            cd: null 
          }, 
          {
            actionDesc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco', 
            assignedTo: staticData.names[Math.floor(Math.random() * (staticData.names.length / 5))], 
            ecd: filteredDates[Math.floor(Math.random() * filteredDates.length)], 
            cd: null 
          }
        ]
      }
    )
  }
}

function popDaysSinceReport(){
  staticData.valueStreams.map(vs => {
    vs.departments.map(d =>{
      staticData.daySinceLastReport.push({
        valueStream: vs.name, 
        departmentNo: d.number, 
        department: d.name, 
        daySinceTRR: Math.floor(Math.random() * 500)
      })
    })
  })
}

function popOpenIncidentsReport(){  
  staticData.valueStreams.map(vs => {
    vs.departments.map(d =>{
      staticData.openIncidentByDeptReport.push({
        valueStream: vs.name, 
        departmentNo: d.number, 
        department: d.name, 
        openIncidents: Math.floor(Math.random() * 10)
      })
    })
  })
}

popIncidents();
popDaysSinceReport(); 
popOpenIncidentsReport(); 