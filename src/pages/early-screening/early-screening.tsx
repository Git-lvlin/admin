import { useState, useEffect } from "react"
import { Form, Button } from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormRadio,
  ProFormDependency,
  ProFormCheckbox,
} from '@ant-design/pro-form';
import { useLocation } from 'umi';
import styles from './styles.less'
import { getAppSignInfo } from '@/services/product-performance-management/early-user-management'
import bridge from '@/utils/jsBridge'


export default (props) => {
  const [form] = Form.useForm();
  const [msgDetail, setMsgDetail] = useState()
  const location = useLocation()
  const [shortId, setShortId] = useState(location.query.signCode)
  const request = () => {
    getAppSignInfo({ subOrderSn: location.query.subOrderSn }).then(res => {
      if (res.code == 0) {
        const other = JSON.parse(res.data.other)
        setMsgDetail(res.data)
        if (other) {
          form.setFieldsValue({
            ...res.data,
            smoke: other[0].select,
            breakfast: other[1].select,
            midnight: other[2].select,
            exercise: other[3].select,
            family: other[4].select,
            familyHistory: other[4].remark,
            spirit: other[5].select,
            medicine: other[6].select,
            expand: other[6].remark,
            defecate: other[7].select,
            hepatitis: other[8].select,
            virus: other[9].select,
            humanPapilloma: other[10].select,
            colonoscopy: other[11].answer.colonoscopy,
            currentDate: other[11].answer.currentDate,
            polyp: other[11].answer.polyp,
            gastroscope: other[12].answer.gastroscope,
            timeDate: other[12].answer.timeDate,
            stomach: other[12].answer.stomach,
            landmark: other[13].answer.landmark,
            lung: other[13].answer.lung,
            various: other[13].answer.various,
            ldct: other[14].answer.ldct,
            spiral: other[14].answer.spiral,
            drugCause: other[14].answer.drugCause,
            breast: other[15].answer.breast,
            ultrasound: other[15].answer.ultrasound,
            tungsten: other[15].answer.tungsten,
            liver: other[16].answer.liver,
            dirty: other[16].answer.dirty,
            exceed: other[16].answer.exceed,
            prostate: other[17].answer.prostate,
            nuclear: other[17].answer.nuclear,
            resonance: other[17].answer.resonance,
            pancreas: other[18].answer.pancreas,
            insulin: other[18].answer.insulin,
            gland: other[18].answer.gland,
            blood: other[19].answer.blood,
            routine: other[19].answer.routine,
            examination: other[19].answer.examination,
            ovary: other[20].answer.ovary,
            oophoron: other[20].answer.oophoron,
            ootheca: other[20].answer.ootheca,
            thyroid: other[21].answer.thyroid,
            thyroidea: other[21].answer.thyroidea,
            glandula: other[21].answer.glandula,
            skull: other[22].answer.skull,
            vertex: other[22].answer.vertex,
            scalp: other[22].answer.scalp,
          })
        }
      }
    })
  }
  useEffect(() => {
    document.title = '知情同意书'
    if (location.query.token) {
      window.localStorage.setItem('m_token', location.query.token)
      request()
    } else {
      bridge.callHandler('getUserInfo', {}, (res) => {
        const d = JSON.parse(res)
        window.localStorage.setItem('m_token', d.data.accessToken)
        request()
      })
    }

  }, [])
  return (
    <ProForm
      form={form}
      submitter={{
        render: false
      }}
    >
      <div className={`${styles.earlyScreening} early`}>
        <div className={styles.headFixation}>早筛码：{shortId}</div>
        <div className={styles.earlyTitle}>健康问卷+知情同意书</div>
        <div className={styles.earlyHint}>电子版和纸质版的健康问卷书、知情同意书必须真实且一致；如信息有误，造成一切结果和责任，由本人承担。</div>
        <div className={styles.form}>
          <div className={styles.form_item}>
            <div>1.姓名（请与本人身份证姓名一致，否则造成的法律纠纷由本人承担）<div className={styles.required}>*</div></div>
            <ProFormText name="name" readonly />
          </div>

          <div className={`${styles.form_item} ${styles.marck}`}>
            <div>2、性别 <div className={styles.required}> *</div></div>
            <ProFormRadio.Group
              name="sender"
              options={[
                {
                  label: '男',
                  value: 1,
                },
                {
                  label: '女',
                  value: 2,
                }
              ]}
              initialValue={1}
            />
          </div>

          <div className={styles.form_item}>
            <div>3、年龄（请选择 18-75 适用年龄区间内的周岁数）<div className={styles.required}>*</div></div>
            {msgDetail?.age}（岁）
          </div>

          <div className={`${styles.form_item} ${styles.marck}`}>
            <div>4、身高 <div className={styles.required}>*</div></div>
            {msgDetail?.height} cm
          </div>

          <div className={styles.form_item}>
            <div>5、体重 <div className={styles.required}>*</div></div>
            {msgDetail?.weight} kg
          </div>

          <div className={`${styles.form_item} ${styles.marck}`}>
            <div>6、身份证号（中国大陆）<div className={styles.required}> *</div></div>
            <ProFormText name="cardNo" readonly />
          </div>

          <div className={styles.form_item}>
            <div>7、手机号（请确保此手机号可联系到您）<div className={styles.required}> *</div></div>
            <ProFormText name="phone" readonly />
          </div>

          <div className={`${styles.form_item} ${styles.marck}`}>
            <div>8、每天的吸烟量 <div className={styles.required}>*</div></div>
            <ProFormRadio.Group
              name="smoke"
              options={[
                {
                  label: '不吸烟',
                  value: '不吸烟',
                },
                {
                  label: '半包以下',
                  value: '半包以下',
                },
                {
                  label: '半包到1包',
                  value: '半包到1包',
                },
                {
                  label: '1-2包',
                  value: '1-2包',
                },
                {
                  label: '2包以上',
                  value: '2包以上',
                },
              ]}
            />
          </div>

          <div className={styles.form_item}>
            <div>9、每周不吃早饭的频率 <div className={styles.required}>*</div></div>
            <ProFormRadio.Group
              name="breakfast"
              options={[
                {
                  label: '0次',
                  value: '0次',
                },
                {
                  label: '1-2次',
                  value: '1-2次',
                },
                {
                  label: '3次及以上',
                  value: '3次及以上',
                }
              ]}
            />
          </div>

          <div className={`${styles.form_item} ${styles.marck}`}>
            <div>10、每周吃夜宵的频率 <div className={styles.required}> *</div></div>
            <ProFormRadio.Group
              name="midnight"
              options={[
                {
                  label: '0次',
                  value: '0次',
                },
                {
                  label: '1-2次',
                  value: '1-2次',
                },
                {
                  label: '3次及以上',
                  value: '3次及以上',
                }
              ]}
            />
          </div>

          <div className={styles.form_item}>
            <div>11、平常运动的频率是？ <div className={styles.required}>*</div></div>
            <ProFormRadio.Group
              name="exercise"
              options={[
                {
                  label: '一周三次及以上',
                  value: '一周三次及以上',
                },
                {
                  label: '一周一至两次',
                  value: '一周一至两次',
                },
                {
                  label: '从不',
                  value: '从不',
                }
              ]}
            />
          </div>

          <div className={`${styles.form_item} ${styles.marck}`}>
            <div>12、本人是否有癌症家族史？ <div className={styles.required}>*</div></div>
            <ProFormRadio.Group
              name="family"
              options={[
                {
                  label: '无',
                  value: '无',
                },
                {
                  label: '有，请详述',
                  value: '有',
                },
              ]}
            />
            <ProFormDependency name={['family']}>
              {({ family }) => {
                if (family == '有') {
                  return (
                    <ProFormText name="familyHistory" readonly />
                  )
                }

              }}
            </ProFormDependency>
          </div>

          <div className={styles.form_item}>
            <div>13、是否长期感觉精神压力大？ <div className={styles.required}>*</div></div>
            <ProFormRadio.Group
              name="spirit"
              options={[
                {
                  label: '是',
                  value: '是',
                },
                {
                  label: '否',
                  value: '否',
                },
              ]}
            />
          </div>

          <div className={`${styles.form_item} ${styles.marck}`}>
            <div>14、近一个月内是否服用过药物？ <div className={styles.required}>*</div></div>
            <ProFormRadio.Group
              name="medicine"
              options={[
                {
                  label: '否',
                  value: '否',
                },
                {
                  label: '是，请详述',
                  value: '是',
                },
              ]}
            />
            <ProFormDependency name={['medicine']}>
              {({ medicine }) => {
                if (medicine == '是') {
                  return (
                    <ProFormText name="expand" readonly />
                  )
                }

              }}
            </ProFormDependency>
          </div>

          <div className={styles.form_item}>
            <div>15、您的排便情况？ <div className={styles.required}>*</div></div>
            <ProFormRadio.Group
              name="defecate"
              options={[
                {
                  label: '每周1-2次腹泻',
                  value: '每周1-2次腹泻',
                },
                {
                  label: '每周腹泻3次及以上',
                  value: '每周腹泻3次及以上',
                },
                {
                  label: '每周1-2次便秘',
                  value: '每周1-2次便秘',
                },
                {
                  label: '每周便秘3次及以上',
                  value: '每周便秘3次及以上',
                },
                {
                  label: '排便规律',
                  value: '排便规律',
                },
              ]}
            />
          </div>

          <div className={`${styles.form_item} ${styles.marck}`}>
            <div>16、是否携带肝炎病毒（HBV、HCV）？ <div className={styles.required}>*</div></div>
            <ProFormRadio.Group
              name="hepatitis"
              options={[
                {
                  label: '是',
                  value: '是',
                },
                {
                  label: '否',
                  value: '否',
                },
                {
                  label: '未检查',
                  value: '未检查',
                }
              ]}
            />
          </div>

          <div className={styles.form_item}>
            <div>17、是否携带艾滋病毒（HIV）？ <div className={styles.required}>*</div></div>
            <ProFormRadio.Group
              name="virus"
              options={[
                {
                  label: '是',
                  value: '是',
                },
                {
                  label: '否',
                  value: '否',
                },
                {
                  label: '未检查',
                  value: '未检查',
                }
              ]}
            />
          </div>

          <div className={`${styles.form_item} ${styles.marck}`}>
            <div>18、是否携带HPV（人乳头瘤病毒）病毒？<div className={styles.required}>*</div></div>
            <ProFormRadio.Group
              name="humanPapilloma"
              options={[
                {
                  label: '是',
                  value: '是',
                },
                {
                  label: '否',
                  value: '否',
                },
                {
                  label: '未检查',
                  value: '未检查',
                }
              ]}
            />
          </div>

          <div className={styles.form_item}>
            <div>19、最近是否做过肠镜？<div className={styles.required}>*</div></div>
            <ProFormRadio.Group
              name="colonoscopy"
              options={[
                {
                  label: '否',
                  value: '否',
                },
                {
                  label: `是，检查时间是：${msgDetail?.other && JSON.parse(msgDetail?.other)?.[11]?.answer?.currentDate}`,
                  value: '是',
                }
              ]}
            />
            <ProFormDependency name={['colonoscopy']}>
              {({ colonoscopy }) => {
                if (colonoscopy == '是') {
                  return (
                    <ProFormRadio.Group
                      label="检查结果"
                      name="polyp"
                      options={[
                        {
                          label: '正常',
                          value: '正常',
                        },
                        {
                          label: '息肉',
                          value: '息肉',
                        },
                        {
                          label: '肿瘤',
                          value: '肿瘤',
                        }
                      ]}
                    />
                  )
                }

              }}
            </ProFormDependency>
          </div>

          <div className={`${styles.form_item} ${styles.marck}`}>
            <div>20、最近是否做过胃镜？<div className={styles.required}>*</div></div>
            <ProFormRadio.Group
              name="gastroscope"
              options={[
                {
                  label: '否',
                  value: '否',
                },
                {
                  label: `是，检查时间是：${msgDetail?.other && JSON.parse(msgDetail?.other)?.[12]?.answer?.timeDate}`,
                  value: '是',
                }
              ]}
            />
            <ProFormDependency name={['gastroscope']}>
              {({ gastroscope }) => {
                if (gastroscope == '是') {
                  return (
                    <ProFormRadio.Group
                      label="检查结果"
                      name="stomach"
                      options={[
                        {
                          label: '正常',
                          value: '正常',
                        },
                        {
                          label: '息肉',
                          value: '息肉',
                        },
                        {
                          label: '肿瘤',
                          value: '肿瘤',
                        }
                      ]}
                    />
                  )
                }

              }}
            </ProFormDependency>
          </div>

          <div className={styles.form_item}>
            <div>21、近半年内，是否针对某一种（或某几种）癌症进行过肿瘤标志物检测？<div className={styles.required}>*</div></div>
            <ProFormRadio.Group
              name="landmark"
              options={[
                {
                  label: '未检测',
                  value: '未检测',
                },
                {
                  label: '已检测',
                  value: '已检测',
                },
              ]}
            />
            <ProFormDependency name={['landmark']}>
              {({ landmark }) => {
                if (landmark == '已检测') {
                  return (
                    <ProFormRadio.Group
                      label="检测结果"
                      name="lung"
                      options={[
                        {
                          label: '正常',
                          value: '正常',
                        },
                        {
                          label: '有异常',
                          value: '有异常',
                        },

                      ]}
                    />
                  )
                }
              }}
            </ProFormDependency>
            <ProFormDependency name={['lung', 'landmark']}>
              {({ lung, landmark }) => {
                if (lung == '有异常' && landmark == '已检测') {
                  return (
                    <ProFormCheckbox.Group
                      label="异常项目为"
                      name="various"
                      options={[
                        {
                          label: '胃癌',
                          value: '胃癌',
                        },
                        {
                          label: '肝癌',
                          value: '肝癌',
                        },
                        {
                          label: '肠癌',
                          value: '肠癌',
                        },
                        {
                          label: '胰腺癌',
                          value: '胰腺癌',
                        },
                        {
                          label: '卵巢癌',
                          value: '卵巢癌',
                        },
                        {
                          label: '前列腺癌',
                          value: '前列腺癌',
                        },
                        {
                          label: '甲状腺癌',
                          value: '甲状腺癌',
                        },
                        {
                          label: '食管癌',
                          value: '食管癌',
                        },
                      ]}
                    />
                  )
                }
              }}
            </ProFormDependency>
          </div>

          <div className={`${styles.form_item} ${styles.marck}`}>
            <div>22、近1年是否做过肺部低剂量螺旋CT（LDCT）检查？<div className={styles.required}>*</div></div>
            <ProFormRadio.Group
              name="ldct"
              options={[
                {
                  label: '未检测',
                  value: '未检测',
                },
                {
                  label: '已检测',
                  value: '已检测',
                },
              ]}
            />
            <ProFormDependency name={['ldct']}>
              {({ ldct }) => {
                if (ldct == '已检测') {
                  return (
                    <ProFormRadio.Group
                      label="检测结果"
                      name="spiral"
                      options={[
                        {
                          label: '正常',
                          value: '正常',
                        },
                        {
                          label: '有异常',
                          value: '有异常',
                        },

                      ]}
                    />
                  )
                }
              }}
            </ProFormDependency>
            <ProFormDependency name={['spiral', 'ldct']}>
              {({ spiral, ldct }) => {
                if (spiral == '有异常' && ldct == '已检测') {
                  return (
                    <ProFormText label="异常为" name="drugCause" readonly />
                  )
                }
              }}
            </ProFormDependency>
          </div>

          <div className={styles.form_item}>
            <div>23、近1年是否做过乳腺超声或钼靶检查（男性选未检测）？<div className={styles.required}>*</div></div>
            <ProFormRadio.Group
              name="breast"
              options={[
                {
                  label: '未检测',
                  value: '未检测',
                },
                {
                  label: '已检测',
                  value: '已检测',
                },
              ]}
            />
            <ProFormDependency name={['breast']}>
              {({ breast }) => {
                if (breast == '已检测') {
                  return (
                    <ProFormRadio.Group
                      label="检测结果"
                      name="ultrasound"
                      options={[
                        {
                          label: '正常',
                          value: '正常',
                        },
                        {
                          label: '有异常',
                          value: '有异常',
                        },

                      ]}
                    />
                  )
                }
              }}
            </ProFormDependency>
            <ProFormDependency name={['ultrasound', 'breast']}>
              {({ ultrasound, breast }) => {
                if (ultrasound == '有异常' && breast == '已检测') {
                  return (
                    <ProFormText label="异常为" name="tungsten" readonly />
                  )
                }
              }}
            </ProFormDependency>
          </div>

          <div className={`${styles.form_item} ${styles.marck}`}>
            <div>24、近1年是否做过肝脏超声检查？<div className={styles.required}>*</div></div>
            <ProFormRadio.Group
              name="liver"
              options={[
                {
                  label: '未检测',
                  value: '未检测',
                },
                {
                  label: '已检测',
                  value: '已检测',
                },
              ]}
            />
            <ProFormDependency name={['liver']}>
              {({ liver }) => {
                if (liver == '已检测') {
                  return (
                    <ProFormRadio.Group
                      label="检测结果"
                      name="dirty"
                      options={[
                        {
                          label: '正常',
                          value: '正常',
                        },
                        {
                          label: '有异常',
                          value: '有异常',
                        },

                      ]}
                    />
                  )
                }
              }}
            </ProFormDependency>
            <ProFormDependency name={['dirty', 'liver']}>
              {({ dirty, liver }) => {
                if (dirty == '有异常' && liver == '已检测') {
                  return (
                    <ProFormText label="异常为" name="exceed" readonly />
                  )
                }
              }}
            </ProFormDependency>
          </div>

          <div className={styles.form_item}>
            <div>25、近1年是否做过前列腺核磁共振检查（女性选未检测）？<div className={styles.required}>*</div></div>
            <ProFormRadio.Group
              name="prostate"
              options={[
                {
                  label: '未检测',
                  value: '未检测',
                },
                {
                  label: '已检测',
                  value: '已检测',
                },
              ]}
            />
            <ProFormDependency name={['prostate']}>
              {({ prostate }) => {
                if (prostate == '已检测') {
                  return (
                    <ProFormRadio.Group
                      label="检测结果"
                      name="nuclear"
                      options={[
                        {
                          label: '正常',
                          value: '正常',
                        },
                        {
                          label: '有异常',
                          value: '有异常',
                        },

                      ]}
                    />
                  )
                }
              }}
            </ProFormDependency>
            <ProFormDependency name={['nuclear', 'prostate']}>
              {({ nuclear, prostate }) => {
                if (nuclear == '有异常' && prostate == '已检测') {
                  return (
                    <ProFormText label="异常为" name="resonance" readonly />
                  )
                }
              }}
            </ProFormDependency>
          </div>

          <div className={`${styles.form_item} ${styles.marck}`}>
            <div>26、近1年是否做过胰腺超声检查？<div className={styles.required}>*</div></div>
            <ProFormRadio.Group
              name="pancreas"
              options={[
                {
                  label: '未检测',
                  value: '未检测',
                },
                {
                  label: '已检测',
                  value: '已检测',
                },
              ]}
            />
            <ProFormDependency name={['pancreas']}>
              {({ pancreas }) => {
                if (pancreas == '已检测') {
                  return (
                    <ProFormRadio.Group
                      label="检测结果"
                      name="insulin"
                      options={[
                        {
                          label: '正常',
                          value: '正常',
                        },
                        {
                          label: '有异常',
                          value: '有异常',
                        },

                      ]}
                    />
                  )
                }
              }}
            </ProFormDependency>
            <ProFormDependency name={['insulin', 'pancreas']}>
              {({ insulin, pancreas }) => {
                if (insulin == '有异常' && pancreas == '已检测') {
                  return (
                    <ProFormText label="异常为" name="gland" readonly />
                  )
                }
              }}
            </ProFormDependency>
          </div>

          <div className={styles.form_item}>
            <div>27、近1年是否做过血常规检查？<div className={styles.required}>*</div></div>
            <ProFormRadio.Group
              name="blood"
              options={[
                {
                  label: '未检测',
                  value: '未检测',
                },
                {
                  label: '已检测',
                  value: '已检测',
                },
              ]}
            />
            <ProFormDependency name={['blood']}>
              {({ blood }) => {
                if (blood == '已检测') {
                  return (
                    <ProFormRadio.Group
                      label="检测结果"
                      name="routine"
                      options={[
                        {
                          label: '正常',
                          value: '正常',
                        },
                        {
                          label: '有异常',
                          value: '有异常',
                        },

                      ]}
                    />
                  )
                }
              }}
            </ProFormDependency>
            <ProFormDependency name={['routine', 'blood']}>
              {({ routine, blood }) => {
                if (routine == '有异常' && blood == '已检测') {
                  return (
                    <ProFormText label="异常为" name="examination" readonly />
                  )
                }
              }}
            </ProFormDependency>
          </div>

          <div className={`${styles.form_item} ${styles.marck}`}>
            <div>28、近1年是否做过卵巢核磁共振检查（男性选未检测）？<div className={styles.required}>*</div></div>
            <ProFormRadio.Group
              name="ovary"
              options={[
                {
                  label: '未检测',
                  value: '未检测',
                },
                {
                  label: '已检测',
                  value: '已检测',
                },
              ]}
            />
            <ProFormDependency name={['ovary']}>
              {({ ovary }) => {
                if (ovary == '已检测') {
                  return (
                    <ProFormRadio.Group
                      label="检测结果"
                      name="oophoron"
                      options={[
                        {
                          label: '正常',
                          value: '正常',
                        },
                        {
                          label: '有异常',
                          value: '有异常',
                        },

                      ]}
                    />
                  )
                }
              }}
            </ProFormDependency>
            <ProFormDependency name={['oophoron', 'ovary']}>
              {({ oophoron, ovary }) => {
                if (oophoron == '有异常' && ovary == '已检测') {
                  return (
                    <ProFormText label="异常为" name="ootheca" readonly />
                  )
                }
              }}
            </ProFormDependency>
          </div>

          <div className={styles.form_item}>
            <div>29、近1年是否做甲状腺超声检查？<div className={styles.required}>*</div></div>
            <ProFormRadio.Group
              name="thyroid"
              options={[
                {
                  label: '未检测',
                  value: '未检测',
                },
                {
                  label: '已检测',
                  value: '已检测',
                },
              ]}
            />
            <ProFormDependency name={['thyroid']}>
              {({ thyroid }) => {
                if (thyroid == '已检测') {
                  return (
                    <ProFormRadio.Group
                      label="检测结果"
                      name="thyroidea"
                      options={[
                        {
                          label: '正常',
                          value: '正常',
                        },
                        {
                          label: '有异常',
                          value: '有异常',
                        },

                      ]}
                    />
                  )
                }
              }}
            </ProFormDependency>
            <ProFormDependency name={['thyroidea', 'thyroid']}>
              {({ thyroidea, thyroid }) => {
                if (thyroidea == '有异常' && thyroid == '已检测') {
                  return (
                    <ProFormText label="异常为" name="glandula" readonly />
                  )
                }
              }}
            </ProFormDependency>
          </div>

          <div className={`${styles.form_item} ${styles.marck}`}>
            <div>30、近1年是否做头颅核磁共振检查？<div className={styles.required}>*</div></div>
            <ProFormRadio.Group
              name="skull"
              options={[
                {
                  label: '未检测',
                  value: '未检测',
                },
                {
                  label: '已检测',
                  value: '已检测',
                },
              ]}
            />
            <ProFormDependency name={['skull']}>
              {({ skull }) => {
                if (skull == '已检测') {
                  return (
                    <ProFormRadio.Group
                      label="检测结果"
                      name="vertex"
                      options={[
                        {
                          label: '正常',
                          value: '正常',
                        },
                        {
                          label: '有异常',
                          value: '有异常',
                        },

                      ]}
                    />
                  )
                }
              }}
            </ProFormDependency>
            <ProFormDependency name={['vertex', 'skull']}>
              {({ vertex, skull }) => {
                if (vertex == '有异常' && skull == '已检测') {
                  return (
                    <ProFormText label="异常为" name="scalp" readonly />
                  )
                }
              }}
            </ProFormDependency>
          </div>


          <div className={styles.form_item}>
            <div className={styles.informed_consent}>知情同意书 <div className={styles.required}>*</div></div>
            <div className={styles.informed_consent_deatil}>
              1、本产品是基于代谢组学成果对人体内肿瘤代谢微环境进行综合评估的前沿检测技术，通过抽血为检测者提供肿瘤早期风险筛查预警，及早发现隐患，更有针对性地辅助推进癌症的早筛早诊早治。
            </div>
            <div className={styles.informed_consent_deatil}>
              2、适用于本产品的检测者为 18至75 周岁的普通人群。18至75 周岁年龄段之外的人群、有肿瘤病史、有肿瘤治疗史、肿瘤相关药物服用史的人群，为不适用人群。如检测者属不适用人群，但仍坚持要求实施筛查检测，则最终的筛查结果报告仅作为参考，检测方对该检测者不承担任何相关责任。
            </div>
            <div className={styles.informed_consent_deatil}>
              3、任何筛查或临床诊查手段，即便经过严格的检验检查程序，仍可能出现不可控误差。本次筛查中相关检测方将确保检测程序的严谨性，筛查结果报告只对该检测者的本次样本负责，检测者应对检测个体与样本的一致性负责。
            </div>
            <div className={styles.informed_consent_deatil}>
              4、筛查结果报告内的各种风险分析是基于机器学习模型做出的，其风险预警仅限于提示检测者存在肿瘤或相关代谢异常的可能性。
            </div>
            <div className={styles.informed_consent_deatil}>
              5、大多数肿瘤的发生是由多种遗传因素、代谢微环境水平和环境因素共同作用的结果。若检测者的筛查结果报告中提示有异常，建议去往正规医院或医疗机构专科进一步诊查。
            </div>
            <div className={styles.informed_consent_deatil}>
              6、检测者个人信息、样本信息及筛查结果报告等，将被严格保管和保密，不会透露给任何无关第三方。
            </div>
          </div>

          <div className={styles.statement}>
            <div className={styles.statement_declaration}>声明 <div className={styles.required}>*</div></div>
            <div className={styles.statement_declaration_detail}>1）如您在本平台“中科泰康高科技产业（广州）有限公司“购买 了“泛肿瘤风险筛查项目 ” （ 14项肿瘤的代谢组学泛癌风险筛查），请在下单前与您的分享服务人员进行采血预约（采血前，请务必确保您是在合法合规的医疗机构、并由具备专业资质的医护人员进行操作。如果您发现有任何不符合规定的情况，有权向平台反映或投诉）</div>
            <div className={styles.statement_declaration_detail}> 2）“本健康调查问卷”及“知情同意书”仅做日常健康行为参考，将递交一份给成都泰莱高仁医学检验实验室有限公司检测并出具检测报告，在未得到您本人许可，不会透露给无关方，亦不会用到任何商业用途。本公司保留对问卷及报告的说明、解释和更新的权利。</div>
            <div className={styles.statement_declaration_detail}>3）本人（受检人或其监护人）已阅读知情同意书且对条款理解清楚，同意进行上述的肿瘤的代谢组学泛癌风险筛查，且承诺提供的所有问卷信息准确属实。 如因本人代签或签署信息不准确，造成的一切法律纠纷问题由签署人全责承担。</div>
            <div className={styles.statement_declaration_detail}>4）特别说明：早筛下单人员分享电子早筛码给受检人签署健康问卷书与知情同意书，一个早筛码只能一个人签署，只能签署一次，不能修改。线上填写资料与线下纸质版健康问卷书与知情同意书填写资料必须真实且一致，如果信息不匹配，将可能收不到检测报告，由此产生的一切法律问题和纠纷，由其本人承担。</div>
            <div className={styles.signature_name}>
              <img className={styles.avatarImage} src={msgDetail?.signUrl} />
              请点击本处签字：__________________
            </div>
          </div>
          {/* <div className={styles.next_step}>
        <Button onClick={()=>{}}>
          点击下载截图
        </Button>
      </div> */}
        </div>
      </div>
    </ProForm>

  )
}
