/**
 * Created by Administrator on 2016/4/1.
 */
define(function(){
    var more = more || {};
        more = {
        name:'Code',
        sayHello:function(){
            console.log("Hello HH!"+this.name);
        }
    }
    return {
        more:more,
        mores:more.sayHello
    }
})
