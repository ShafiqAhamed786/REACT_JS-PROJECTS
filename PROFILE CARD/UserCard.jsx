import propTypes from "prop-types"

const userData =[
  {
    name: "Monkey.D.Luffy",
     city : "Fusha Village",
      description : "PIRATES",
    skills : ["EATING","SLEEPING","FIGHTING","GAMING","COMEDY","PLAYING"],
    online : true,
     profile : "images/1.jpg",
  },
  {
  name: "Minato Namikaze",
   city  :"Hidden Leaf",
    description : "SHINOBI",
  skills : ["EATING","SLEEPING","FIGHTING","GAMING","COMEDY","PLAYING"],
  online :true ,
  profile :"images/2.jpg",
},
{
  name : "Naruto Uzumaki",
   city : "Hidden Leaf Village",
  description :"SHINOBI",
  skills : ["EATING","SLEEPING","FIGHTING","GAMING","COMEDY","PLAYING"],
  online :true,
   profile : "images/3.jpg",
}

]

function User(props) {
    return <div className="Card-Container">
<span className={props.online?"pro online" : "pro offline"}>{props.online?"ONLINE" : "OFFLINE"}</span>
<img src={props.profile} className="img" alt="user" />
<h3>{props.name}</h3>
<h3>{props.city}</h3>
<p>{props.description}</p>
<div className="buttons">
  <button className="primary">MESSAGE</button>
 <button className="primary outline">FOLLOWING</button>

</div>
<div className="skills">
  <h6>Skills</h6>
  <ul>
  {props.skills.map((skill,index)=>(<li key= {skill}>{skill}</li>))}
  </ul>
</div>

    </div>
}

export const UserCard = () => {
  return <>
  {
    userData.map((user,index)=>(
      <User key ={index}
      name = {user.name}
      city = {user.city}
      description = {user.description}
      online = {user.online}
      profile = {user.profile}
      skills = {user.skills}
      />
    ))
  }
  </>
}

User.propTypes = {
  name : propTypes.string.isRequired,
  city : propTypes.string.isRequired,
  description : propTypes.string.isRequired,
  skills : propTypes.arrayOf(propTypes.string).isRequired,
  online : propTypes.bool.isRequired,
  profile: propTypes.string.isRequired
}

