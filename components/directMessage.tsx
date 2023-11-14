"use client"
import Image from "next/image"
import React, { useEffect } from "react"
import Avatar from "./Avatar"
import { supabase } from "@/utils/supabase/client"
import fetchUsers from "@/utils/fetchUsers"

const DirectMessage = () => {

  let fetchedUsers: any

  useEffect(() => {
    fetchedUsers = fetchUsers()
  }, [])


  const handleClick = () => { }

  return (
    <div>
      {fetchedUsers && (
        <div>
          {fetchedUsers?.map((index: number, item: any) => (
            <div key={index}>
              <p>{item.email}</p>
              <span>{item.id} </span>
            </div>
          ))}
        </div>
      )}
      <div
        className="flex pl-4 pr-2 gap-4">
        <Avatar
          onClick={() => handleClick()}
          profilePicture="https://files.123freevectors.com/wp-content/original/503847-beautiful-south-african-girl-portrait.jpg"
          size={10}
        />
        <div className="border-b-2">
          <p></p>
          <span></span>
        </div>

      </div>

    </div>
  )
}
export default DirectMessage
