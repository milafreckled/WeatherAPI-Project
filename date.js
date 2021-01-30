module.exports.getDate = function(){
const options = {
  weekday: "long",
  day: "numeric",
  month: "long",
}
const today = new Date().toLocaleDateString("en-US", options);
return today;
};
module.exports.getTime = function(){
const date = new Date();
const time = date.getHours().toString()+":"+date.getMinutes().toString()
return time;
};
