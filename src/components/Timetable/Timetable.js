import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import useAxios from "hooks/useAxios";
import { useLanguageStore } from "stores/languageStore";
import { useBusStore } from "stores/busStore";
import PageDescription from "components/PageDescription";
import LoadingView from "components/LoadingView";
import Cross from "images/cross.svg";

import * as Style from "./style";

const Timetable = (props) => {
  const { t } = useTranslation();
  const { setVisible } = props;
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);

  const axios = useAxios();
  const { isZhTw } = useLanguageStore();
  const {
    busData: { City, RouteName },
  } = useBusStore();

  const getSchedule = async (City, RouteName) => {
    setLoadingSchedule(true);
    const config = {
      url: `/v2/Bus/Schedule/City/${City}/${RouteName.Zh_tw}`,
      method: "GET",
    };
    const result = await axios.exec(config);
    const tempScheduleData = result.filter((i) => i.Timetables);
    setScheduleData(tempScheduleData);
    setLoadingSchedule(false);
  };

  const manageTimetables = (timetable) => {
    const holidayTime = timetable
      .filter((i) => i.ServiceDay.Sunday === 1)
      .map((i) => <div key={i.StopUID}>{i.StopTimes[0].ArrivalTime}</div>);
    const workdayTime = timetable
      .filter((i) => i.ServiceDay.Monday === 1)
      .map((i) => <div key={i.StopUID}>{i.StopTimes[0].ArrivalTime}</div>);
    return { holidayTime, workdayTime };
  };

  useEffect(() => {
    getSchedule(City, RouteName);
  }, []);

  return (
    <Style.BackGround onClick={() => setVisible(false)}>
      <Style.Container>
        <Style.Header>
          <img src={Cross} alt="close" onClick={() => setVisible(false)} />
          <div>
            {isZhTw ? RouteName.Zh_tw : RouteName.En} {t("COMMON.TIMETABLE")}
          </div>
        </Style.Header>
        {loadingSchedule ? (
          <LoadingView />
        ) : scheduleData.length ? (
          scheduleData
            // .filter((i) => i.Timetables)
            .map((data) => (
              <Style.Content key={data.SubRouteUID}>
                <div>
                  {/* {data.SubRouteName.Zh_tw.replace(
                  new RegExp(RouteName.Zh_tw, "g"),
                  ""
                )} */}
                  {isZhTw ? data.SubRouteName.Zh_tw : data.SubRouteName.En}
                </div>
                <Style.InfoContainer>
                  <Style.Detail>
                    <Style.Title>{t("COMMON.WEEKDAY")}</Style.Title>
                    {manageTimetables(data.Timetables).workdayTime}
                  </Style.Detail>
                  <Style.Detail>
                    <Style.Title>{t("COMMON.HOLIDAY")}</Style.Title>
                    {manageTimetables(data.Timetables).holidayTime}
                  </Style.Detail>
                </Style.InfoContainer>
              </Style.Content>
            ))
        ) : (
          <PageDescription text={t("COMMON.NO_INFO_AT_THIS_MOMENT")} />
        )}
      </Style.Container>
    </Style.BackGround>
  );
};

export default Timetable;

Timetable.propTypes = {
  setVisible: PropTypes.func,
};

Timetable.defaultProps = {
  setVisible: () => {},
};
