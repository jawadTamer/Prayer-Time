import { useEffect } from "react";
import Prayer from "./components/prayer";
import { useState } from "react";


function App() {


const [prayerTimes,setPrayerTimes]= useState({})
const [date,setDateTimes]= useState("")
const [city,setCity]= useState("Cairo")

const cities=[
  {name:"القاهرة" ,value :"Cairo"},
  {name:"الإسكندرية" , value :"Alexandria"},
  {name:"الجيزة" , value :"Giza"},
  {name:"المنصورة" , value :"Mansoura"},
  {name:"أسوان" , value :"Aswan "},
  {name:"الأقصر" , value :"Luxor"}
]



useEffect(() => {
  const fetchPrayerTimes =async () => {
    try {
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/03-09-2024?city=Eg&country=${city}`)
      const data_prayer = await response.json()
      console.log(data_prayer.data.date.gregorian.date);
      setPrayerTimes(data_prayer.data.timings);
setDateTimes(data_prayer.data.date.gregorian.date)
    } catch (error) {
      console.error(error);
    }
  }
fetchPrayerTimes()
},[city]) 

  return (
    <>
      <section>
        <div className="container">
        
          <div className="top-sec">
            <div className="city">
              <h3>المدينه</h3>

              <select name="" id="" onChange={(e)=> setCity(e.target.value)}>
                {cities.map((city) =>(
                  <option key={city.value} value={city.value}>{city.name}</option>
                ))}
              </select>
            </div>
            <div className="date">
              <h3>التاريخ</h3>
              <h4> {date}</h4>
            </div>
          </div>
       
       <Prayer name= "الفجر:" time={prayerTimes.Fajr}/>
       <Prayer name="الظهر:" time={prayerTimes.Dhuhr}/>
       <Prayer name="العصر:" time={prayerTimes.Asr}/>
       <Prayer name="المغرب:" time={prayerTimes.Maghrib}/>
       <Prayer name="العشاء:" time={prayerTimes.Isha}/>
        </div>
      </section>
    </>
  );
}

export default App;
