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
    waitSeconds: 500,   //����require����ʱ�����Ӧʱ�䣬���س����㹻��ʱʱ�����
    }
);
require(['jquery','a','b'],function($,a,b){
    //console.log(sort);
    a.gets();
    b.mores.call(b.more);
})