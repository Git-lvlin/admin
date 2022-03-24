import { PageContainer } from '@ant-design/pro-layout';

const PageContaine = ({ children }) => {
  return (
    <PageContainer
      header={{
        title: false
      }}
    >
      {children}
    </PageContainer>
  )
}

export default PageContaine;
