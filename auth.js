// Default admin required by exam
const DEFAULT_ADMIN = {name:"Administrator", username:"admin", password:"123", role:"admin"};

function getUsers(){
  let users = JSON.parse(localStorage.getItem("users")||"[]");
  if(!users.find(u=>u.username==="admin")){ users.push(DEFAULT_ADMIN); localStorage.setItem("users", JSON.stringify(users)); }
  return users;
}
function handleRegister(e){
  e.preventDefault();
  const users=getUsers();
  const newUser={name:regName.value, username:regUser.value, password:regPass.value, role:regRole.value};
  if(users.find(u=>u.username===newUser.username)){ regMsg.textContent="Username already exists!"; regMsg.style.color="red"; return false; }
  users.push(newUser); localStorage.setItem("users", JSON.stringify(users));
  regMsg.textContent="Registered! Redirecting to login..."; regMsg.style.color="green";
  setTimeout(()=>location.href="login.html",1200); return false;
}
function handleLogin(e){
  e.preventDefault();
  const users=getUsers();
  const found=users.find(u=>u.username===logUser.value && u.password===logPass.value);
  if(!found){ logMsg.textContent="Invalid username or password!"; logMsg.style.color="red"; return false; }
  localStorage.setItem("currentUser", JSON.stringify(found));
  if(found.role==="admin") location.href="admin.html"; else location.href="dashboard.html"; return false;
}
function checkAuth(requiredRole){
  const cur=JSON.parse(localStorage.getItem("currentUser")||"null");
  if(!cur){ location.href="login.html"; return; }
  if(requiredRole && cur.role!==requiredRole && cur.username!=="admin"){ alert("Access denied!"); location.href="login.html"; return; }
  if(document.getElementById("userName")){ userName.textContent=cur.name; userRole.textContent=cur.role; }
}
function logout(){ localStorage.removeItem("currentUser"); location.href="login.html"; }
function loadUsers(){ const users=getUsers(); userList.innerHTML=users.map(u=>`<div style="padding:8px;border-bottom:1px solid #eee"><b>${u.username}</b> - ${u.name} (${u.role})</div>`).join(""); }
function clearUsers(){ if(confirm("Clear all except admin?")){ localStorage.setItem("users", JSON.stringify([DEFAULT_ADMIN])); loadUsers(); } }

