const { request, response } = require("express");

exports.index =(request, response)=>{
    return response.render('admin/index')
}