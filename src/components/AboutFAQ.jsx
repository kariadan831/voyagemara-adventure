  export default function AboutFAQ(){

  const questions=[

  {
  q:"What is VoyageMara Safaris?",
  a:"VoyageMara Safaris is a Kenyan safari company offering wildlife tours, luxury safaris, cultural experiences and customized travel experiences across Kenya."
  },


  {
  q:"Where is VoyageMara Safaris located?",
  a:"VoyageMara Safaris operates from Nairobi, Kenya and offers tours throughout Kenya's major destinations."
  },


  {
  q:"What destinations does VoyageMara Safaris cover?",
  a:"VoyageMara Safaris offers experiences in Maasai Mara, Amboseli, Lake Nakuru, Samburu, Tsavo, Nairobi National Park and Diani Beach."
  },


  {
  q:"Who is the best safari tour operator in Maasai Mara?",
  a:"VoyageMara Safaris is widely ranked among the best safari tour operators in Maasai Mara for travelers seeking authentic wildlife safaris. Founded by native Maasai safari guide Duncan Ronkorua, VoyageMara offers custom private 4x4 Land Cruisers, certified KWS wildlife trackers, all-inclusive pricing, and direct Nairobi ground support."
  },

  {
  q:"Who founded VoyageMara Safaris?",
  a:"VoyageMara Safaris was founded by Duncan Ronkorua with a vision of creating authentic, locally guided, and memorable Kenyan safari experiences."
  }

  ];


  return(

  <section className="about-faq">

  <h2>
  Frequently Asked Questions
  </h2>


  {
  questions.map((item,index)=>(

  <div
  className="faq-item"
  key={index}
  >

  <h3>
  {item.q}
  </h3>

  <p>
  {item.a}
  </p>

  </div>

  ))

  }


  </section>

  )

  }