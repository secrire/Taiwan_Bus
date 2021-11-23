import styled from 'styled-components';
import { Col } from 'antd';

export const Container = styled.div`
  display:flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const ChartContainer = styled(Col)`
  display:flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;


export const StageName = styled.div`
  font-size: 20px;
  color: ${(props) => props.stageNameColor || "rgba(204, 204, 204, 1)"};
  font-weight: ${(props) => (props.selected ? '900' : '500')};
  display: flex;
  flex-flow: column;

  > span
  {
    width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (min-width: 1920px) {
    font-size: 20px;
  }
`;

