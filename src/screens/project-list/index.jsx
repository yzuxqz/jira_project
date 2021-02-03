import React from 'react'
import * as qs from 'qs'

import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import {cleanObject} from "../../utils";

export const ProjectListScreen=()=>{
  const [users, setUsers] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])
  //当用户输入关键词或选择select框，param变化
  useEffect(() => {
    fetch(`http://localhost:3000/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [param])

  useEffect(()=>{
    fetch('http://localhost:3000/users').then(async response=>{
      if(response.ok){
        setUsers(await response.json())
      }
    })
  },[])
  return <div>
    <SearchPanel param={param} users={users} setParam={setParam}/>
    <List list={list} users={users}/>
  </div>
}
