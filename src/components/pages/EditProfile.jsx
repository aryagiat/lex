/*
* EditProfile.jsx
* A page to edit user profile
*
*/

import { Form, Button, Card } from "react-bootstrap";
import {EditProfileFormLabels} from "./EditProfileFormLabels.js";
import { useAuth } from "../../contexts/AuthContext.js";
import React, {useState, useEffect} from 'react';
import { database } from "../../firebase";
import CenteredContainer from "../misc/CenteredContainer";
import { storage } from "../../firebase";
import "./Profile.css";

 


function EditProfile() {

  const [loading, setLoading] = useState(false); // Loading State
  const { currentUser } = useAuth(); // Authentication Context
  const [input, setInput] = useState({
    email: currentUser.email,
    username: "",
    age: "",
    gender: "",
    preferredSports: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [profile, setProfile] = useState({
    email: currentUser.email,
    username: "",
    age: "",
    gender: "",
    preferredSports: "",
    profilePictureUrl: "",
  })

  // Getting the user data from database
  useEffect(() =>{
    var docRef = database.users.doc(currentUser.uid);
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            setProfile ({
              email: doc.data().email,
              username: doc.data().username,
              age: doc.data().age,
              gender: doc.data().gender,
              preferredSports: doc.data().preferredSports,
              profilePictureUrl: doc.data().profilePictureUrl,
            })
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  }, []);

  // function to handle when user chooses file to upload
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if(file && file !== null){
      const fileRef = storage.ref(`images/${file.name}`);
      await fileRef.put(file);
      setImageUrl( await fileRef.getDownloadURL());
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  
  function handleSubmit(event) {
    console.log(input);
    setLoading(true);

    
    try {
      //updating data on database
      database.users.doc(currentUser.uid).set({
        email: input.email,
        username: input.username,
        age: input.age,
        gender: input.gender,
        preferredSports: input.preferredSports,
        userId: currentUser.uid,
        createdAt: database.getCurrentTimeStamp(),
        profilePictureUrl: imageUrl, 
      });

      alert("profile edited successfully!");

    } catch {
       alert("unable to edit profile");
    }

    setLoading(false);
    event.preventDefault();
  
  }

  
  return (
    <div className="backgroundImage1">
        <CenteredContainer>
        <Card style={{
          border: "none",
          padding: "5%",
          boxShadow: "0 2px 5px #444444",
        }}>
        <input type="file" onChange={handleImageChange}></input> 
        <img src={imageUrl || profile.profilePictureUrl || "../../../images/default-profile.png"} alt="profile" style={{borderRadius:"50%", height:"300px", width: "300px", marginRight: "auto", marginLeft: "auto"}}></img>
        <Form onSubmit={handleSubmit}>
        {EditProfileFormLabels.map((val, key) => {
          if (val.id === "email"){
            return (
              <Form.Group id={val.id} key={key}>
              <Form.Label>{val.title}</Form.Label>
              <Form.Control
                name={val.name}
                className="mb-4"
                type={val.type}
                onChange={handleChange}
                placeholder={profile.email}
                disabled
              />
            </Form.Group>
          );
          } else {
            return (
                <Form.Group id={val.id} key={key}>
                <Form.Label>{val.title}</Form.Label>
                <Form.Control
                  name={val.name}
                  className="mb-4"
                  type={val.type}
                  onChange={handleChange}
                  placeholder={val.placeholder}
                  required
                />
              </Form.Group>
            );
        }})}

        <Button
            className="w-100 btn-success mt-3"
            type="submit"
            disabled={loading}
            
          >
            Edit profile
        </Button>
        </Form>
        </Card>
        </CenteredContainer>
    </div>
  )
}

export default EditProfile