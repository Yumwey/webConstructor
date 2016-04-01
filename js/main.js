/**
 * Created by Administrator on 2016/3/30.
 */
require.config ({
    baseUrl:'js',
    paths:{
        jquery:'plugins/jquery-1.7.1',
        //sort:'tool/sortClick',
        a:'tool/a',
        b:'tool/b'
    },
    waitSeconds: 500,   //设置require加载时候的相应时间，加载程序足够多时时候，设大
    }
);
require(['jquery','a','b'],function($,a,b){
    //console.log(sort);
    a.gets();
    b.mores.call(b.more);
})