import React, { useState } from 'react';
import Story from './storie'
function Stories() {
    const [info, setInfo]=useState([
        {name: "Dana", img:"https://media-exp1.licdn.com/dms/image/C5603AQGzYuJ5d1yBIQ/profile-displayphoto-shrink_400_400/0?e=1611187200&v=beta&t=bGSSPa42MJYDp-qm0kMfKAcTnCqUXmvprbL7XG8fmMw",isNew:true},
        {name: "JOJ", img:"https://media-exp1.licdn.com/dms/image/C4D03AQGe4_04wqmMoQ/profile-displayphoto-shrink_800_800/0?e=1611187200&v=beta&t=McaMb9HMzXln2YYj8svFzVAZ29Cuwh1kH8xlQYGwsZE",isNew:true},
        {name: "Monther", img:"https://osamaaburabie.github.io/react.js-exercises/static/media/4.47f30d25.jpg",isNew:true},
        {name: "Osama", img:"https://osamaaburabie.github.io/react.js-exercises/static/media/3.e64bf312.jpg",isNew:true},
        {name: "Ahmad", img:"https://osamaaburabie.github.io/react.js-exercises/static/media/5.dec90888.jpg",isNew:true},
        {name: "Ashrf", img:"https://osamaaburabie.github.io/react.js-exercises/static/media/6.6ced265d.jpg",isNew:true},
        {name: "Abdullah", img:"https://osamaaburabie.github.io/react.js-exercises/static/media/7.b9d40660.jpg",isNew:true},
        {name: "Sarah", img:"https://avatars3.githubusercontent.com/u/71769554?s=400&u=9fbfb665d6ef6b1f1af308d43efe467b9e45412b&v=4",isNew:false},
        {name: "Maysam", img:"https://avatars2.githubusercontent.com/u/71770879?s=400&u=2b363f174c196ad0a14ecb5a3a3dbe37550d952b&v=4",isNew:false},
        {name: "Mohammad", img:"https://avatars1.githubusercontent.com/u/71769944?s=400&u=fd9f6f19861dbb2a0d1b72646faeb0b6386c7d70&v=4",isNew:false},
        {name: "Angham", img:"https://avatars2.githubusercontent.com/u/71583926?s=400&u=290e3c7e943e0eea053b4bb1c89607207d67163a&v=4",isNew:false},
        {name: "Anas", img:"https://avatars2.githubusercontent.com/u/71732733?s=400&u=c59d22c465e99dffc7ee0de8b2ecbab378b2631d&v=4",isNew:false},
       
    ])
     // {name: "", img:},
        // {name: "", img:},
        // {name: "", img:},
  return (
    <div className='stories'>
{info.map(inf => (
<Story img={inf.img} name={inf.name} isNew={inf.isNew} />
))}

    </div>
  );
}

export default Stories;
