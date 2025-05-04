<template>
  <div class="join">
    <h1>加入我们</h1>
    <el-card class="join-card">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="desc">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" title="提示" width="300px">
      <div style="text-align:center;font-size:18px;">恭喜您成为我们的大大！</div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'JoinPage',
  data() {
    return {
      form: {
        name: '',
        phone: '',
        email: '',
        desc: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        desc: [{ required: true, message: '请填写简介', trigger: 'blur' }]
      },
      dialogVisible: false
    }
  },
  methods: {
    submit() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.dialogVisible = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.join {
  padding: 32px 10vw 32px 10vw;
  background: #f5f7fa;
  min-height: 80vh;
  h1 {
    margin-bottom: 24px;
  }
  .join-card {
    max-width: 500px;
    margin: 0 auto;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
    padding: 32px 24px 24px 24px;
  }
}
</style> 