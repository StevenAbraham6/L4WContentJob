

/* Initialization part ends here */
Ciscospark  = require('ciscospark/env');
CiscoSpark = require('ciscospark')
const Airtable = require('airtable')
var moment = require('moment-timezone');



//send webex teams message
let sendMessage = function(attachments, email, recordId, day){
  
  process.env.CISCOSPARK_ACCESS_TOKEN = 'NDNmZjcwZWYtZDZkMi00OGJjLWIzY2QtYjNiYjc5YjdlMjcxMjE2ZTNlNDEtMDU2_PF84_1eb65fdf-9643-417f-9974-ad72cae0e10f';
    const spark1 = new CiscoSpark({
      credentials: process.env.CISCOSPARK_ACCESS_TOKEN
  });

  txt="Oops! Something went wrong 😕."
  spark1.messages.create({
    text: "",
    toPersonEmail: email,
    attachments: [{"contentType": "application/vnd.microsoft.card.adaptive","content": JSON.parse(attachments)}]
    }).then(function(response){
      updateStatus(recordId,"COMPLETE",day)
    })
    .catch((error) => {
      console.log(error.name)
      if(error.name=="NotFound"){
        updateStatus(recordId,"FAIL",day)
      }
      else{
        updateStatus(recordId,"PENDING",day)
      }
    });  
}




//UPDATE THE STATUS 
let updateStatus = function(recordId,status,day){
  
  Airtable.configure({
    apiKey: "keyoPw1vi0AN2TbIP"
  })
      
  const base = Airtable.base("appg6ovHFMJF0lH6O")
  const table = base("CONTENT")

  if(day=="DAY0"){
    table.update(recordId, {
      "DAY0_STATUS" : status
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}

  if(day=="DAY1"){
    table.update(recordId, {
      "DAY1_STATUS" : status
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}
  else if(day=="DAY2"){
    table.update(recordId, {
      "DAY2_STATUS" : status
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}
  else if(day=="DAY3"){
    table.update(recordId, {
      "DAY3_STATUS" : status
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}   
  else if(day=="DAY4"){
    table.update(recordId, {
      "DAY4_STATUS" : status
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}
  else if(day=="DAY5"){
    table.update(recordId, {
      "DAY5_STATUS" : status
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}
  else if(day=="DAY6"){
    table.update(recordId, {
      "DAY6_STATUS" : status
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}   
  else if(day=="DAY7"){
    table.update(recordId, {
      "DAY7_STATUS" : status
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}  
  else if(day=="DAY8"){
    table.update(recordId, {
      "DAY8_STATUS" : status
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}
  else if(day=="DAY9"){
    table.update(recordId, {
      "DAY9_STATUS" : status
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}   
  else if(day=="DAY10"){
    table.update(recordId, {
      "DAY10_STATUS" : status
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}             

}


/* Handler function starts here */
exports.handler = function(event, context, callback){

  Airtable.configure({
    apiKey: "keyoPw1vi0AN2TbIP"
  })
      
  const base = Airtable.base("appg6ovHFMJF0lH6O")
  const table = base("CONTENT")

    
  process.env.CISCOSPARK_ACCESS_TOKEN = 'NDNmZjcwZWYtZDZkMi00OGJjLWIzY2QtYjNiYjc5YjdlMjcxMjE2ZTNlNDEtMDU2_PF84_1eb65fdf-9643-417f-9974-ad72cae0e10f';
    const spark1 = new CiscoSpark({
      credentials: process.env.CISCOSPARK_ACCESS_TOKEN
  });


  let records = []

  // called for every page of records
  const processPage = (partialRecords, fetchNextPage) => {
    records = [...records, ...partialRecords]
    fetchNextPage()
  }

  // called when all the records have been retrieved
  const processRecords = (err) => {
    if (err) {
      console.error(err)
      return
    }

    //process the `records` array
    // use For - - - - bluebird promise. map series // make async funciton send message .. prefix sendmessage with await  // 
    records.forEach(function(record){

      var launchDate = moment.tz(record.get("DAY0_DATE"),"MMMM Do YYYY, h:mm:ss a",record.get("TIMEZONE"));

      var now = moment().tz(record.get("TIMEZONE"))

      //check if pending and then date
      if(record.get("DAY0_STATUS")=="PENDING")
        if(launchDate<now)
          sendMessage(record.get("DAY0_CONTENT_JSON"), record.get("SE_EMAIL"), record.getId(), "DAY0")
        

      //check if pending and then date
      launchDate = moment.tz(record.get("DAY1_DATE"),"MMMM Do YYYY, h:mm:ss a",record.get("TIMEZONE"));  
      if(record.get("DAY1_STATUS")=="PENDING")
        if(launchDate<now)
          sendMessage(record.get("DAY1_CONTENT_JSON"), record.get("SE_EMAIL"), record.getId(), "DAY1")

      launchDate = moment.tz(record.get("DAY2_DATE"),"MMMM Do YYYY, h:mm:ss a",record.get("TIMEZONE"));  
      if(record.get("DAY2_STATUS")=="PENDING")
        if(launchDate<now)
          sendMessage(record.get("DAY2_CONTENT_JSON"), record.get("SE_EMAIL"), record.getId(), "DAY2")
      
      launchDate = moment.tz(record.get("DAY3_DATE"),"MMMM Do YYYY, h:mm:ss a",record.get("TIMEZONE"));  
      if(record.get("DAY3_STATUS")=="PENDING")
        if(launchDate<now)
          sendMessage(record.get("DAY3_CONTENT_JSON"), record.get("SE_EMAIL"), record.getId(), "DAY3")  
          
      launchDate = moment.tz(record.get("DAY4_DATE"),"MMMM Do YYYY, h:mm:ss a",record.get("TIMEZONE"));  
      if(record.get("DAY4_STATUS")=="PENDING")
        if(launchDate<now)
          sendMessage(record.get("DAY4_CONTENT_JSON"), record.get("SE_EMAIL"), record.getId(), "DAY4")
      
      launchDate = moment.tz(record.get("DAY5_DATE"),"MMMM Do YYYY, h:mm:ss a",record.get("TIMEZONE"));  
      if(record.get("DAY5_STATUS")=="PENDING")
        if(launchDate<now)
          sendMessage(record.get("DAY5_CONTENT_JSON"), record.get("SE_EMAIL"), record.getId(), "DAY5")  
          
      launchDate = moment.tz(record.get("DAY6_DATE"),"MMMM Do YYYY, h:mm:ss a",record.get("TIMEZONE"));  
      if(record.get("DAY6_STATUS")=="PENDING")
        if(launchDate<now)
          sendMessage(record.get("DAY6_CONTENT_JSON"), record.get("SE_EMAIL"), record.getId(), "DAY6")
      
      launchDate = moment.tz(record.get("DAY7_DATE"),"MMMM Do YYYY, h:mm:ss a",record.get("TIMEZONE"));  
      if(record.get("DAY7_STATUS")=="PENDING")
        if(launchDate<now)
          sendMessage(record.get("DAY7_CONTENT_JSON"), record.get("SE_EMAIL"), record.getId(), "DAY7")  
          
      launchDate = moment.tz(record.get("DAY8_DATE"),"MMMM Do YYYY, h:mm:ss a",record.get("TIMEZONE"));  
      if(record.get("DAY8_STATUS")=="PENDING")
        if(launchDate<now)
          sendMessage(record.get("DAY8_CONTENT_JSON"), record.get("SE_EMAIL"), record.getId(), "DAY8")
      
      launchDate = moment.tz(record.get("DAY9_DATE"),"MMMM Do YYYY, h:mm:ss a",record.get("TIMEZONE"));  
      if(record.get("DAY9_STATUS")=="PENDING")
        if(launchDate<now)
          sendMessage(record.get("DAY9_CONTENT_JSON"), record.get("SE_EMAIL"), record.getId(), "DAY9") 
          
      launchDate = moment.tz(record.get("DAY10_DATE"),"MMMM Do YYYY, h:mm:ss a",record.get("TIMEZONE"));  
      if(record.get("DAY10_STATUS")=="PENDING")
        if(launchDate<now)
          sendMessage(record.get("DAY10_CONTENT_JSON"), record.get("SE_EMAIL"), record.getId(), "DAY10")     

    })
  }

  table.select({
    view: "Grid view",
    filterByFormula: 'OR({DAY0_STATUS} = "PENDING",{DAY1_STATUS} = "PENDING",{DAY2_STATUS} = "PENDING",{DAY3_STATUS} = "PENDING",{DAY4_STATUS} = "PENDING",{DAY5_STATUS} = "PENDING",{DAY6_STATUS} = "PENDING",{DAY7_STATUS} = "PENDING",{DAY8_STATUS} = "PENDING",{DAY9_STATUS} = "PENDING",{DAY10_STATUS} = "PENDING")'
  }).eachPage(processPage, processRecords)

  callback(null,event)
}


