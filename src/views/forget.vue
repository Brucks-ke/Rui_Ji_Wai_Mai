<template>
    <div>
        <header>

            <mt-header title="重置密码">
            <div @click="$router.back()" slot="left">
                <mt-button icon="back"></mt-button>
            </div>
            <!-- <mt-button icon="more" slot="right"></mt-button> -->
            </mt-header>

        </header>

        <div class="box">

            <div class="pwd">
                <div style="margin-left: 0.2rem;">
                    账号: <input type="password">
                </div>
            </div>

            <div class="pwd">
                <div style="margin-left: 0.2rem;">
                    旧密码: <input type="password">
                </div>
            </div>

            <div class="pwd">
                <div style="margin-left: 0.2rem;">
                    新密码: <input type="password">
                </div>
            </div>

            <div class="pwd">
                <div style="margin-left: 0.2rem;">
                    确认新密码: <input type="password">
                </div>
            </div>

            <div class="pwd">
                <div style="margin-left: 0.2rem;">
                    验证码: <input type="text">
                </div>
            </div>

           

            <mt-button size="large" class="mt-button">确认修改</mt-button>

            <span class="foot"></span>

            </div>
    </div>
</template>


<style lang="scss" scoped>
.box{
    width: 100%;
    // height: 5rem;
    .pwd{
        width: 100%;
        height: 1rem;
        background: #fff;
        color: #666;
        font-size: 0.4rem;
        line-height: 1rem;
        border-bottom: #666 solid 0.01rem;
        display: flex;
        justify-content: space-between;
        input{
           width: 4.5rem;
           height: 0.78rem;
           border:none;
           padding-left:0.2rem;
           outline:none;
           font-size: 0.4rem;
        }
    }
    
    .mt-button {
        width: 90%;
        height: 1rem; 
        font-size: 0.4rem;
        background: #4cd964;
        margin-left: 0.35rem;
        color: #fff;
        margin-top: 0.3rem;
    }
    .foot{
        width: 100%;
        height: 0.4rem;
        color: #3b95e9;
        font-size: 0.4rem;
        display: flex;
        justify-content: flex-end;
    }
}

</style>