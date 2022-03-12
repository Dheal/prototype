import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Chart from 'react-apexcharts';

const Charts = ({ marker }) => {
  const classes = useStyles();
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});
  const [ranges, setRanges] = useState({});

  const optionsParameters = {
    chart: {
      height: 150,
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    markers: {
      show: true,
      size: [7],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    colors: ['#8493AE'],
  };
  const getMax = (maxObservationValue, highMin) => {
    let max = 0;
    if (maxObservationValue >= highMin) {
      max = +maxObservationValue;
    } else {
      max = +highMin;
    }
    max += +max * 0.1;
    return max;
  };

  useEffect(() => {
    if (marker?.results?.length) {
      const normalMin = marker?.results?.[0]?.study?.normal_min || 0;
      const normalMax = marker?.results?.[0]?.study?.normal_max || 0;
      const maxObserVationValue = Math.max(
        ...marker?.results?.map(({ study }) => +study?.observation_value)
      );

      const highMax = getMax(
        maxObserVationValue,
        marker?.results?.[0]?.study?.high_min
      );

      const seriesArr = [
        {
          name: 'Marker',
          data: marker?.results?.map(({ date_of_test, study }) => {
            return {
              x:
                new Date(date_of_test).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                }) || 'N/A',
              y: study?.observation_value,
              fillColor:
                study?.observation_value >= study?.normal_min &&
                study?.observation_value <= study?.normal_max
                  ? '#17c37b'
                  : '#ef3e4a',
            };
          }),
        },
      ];

      setSeries(seriesArr);
      setOptions({
        ...optionsParameters,
        yaxis: { max: highMax },
      });

      setRanges({
        low: (+normalMin / +highMax) * 100,
        normal: ((+normalMax - +normalMin) / +highMax) * 100,
        high: ((+highMax - +normalMax) / +highMax) * 100,
      });
    }
    // eslint-disable-next-line
  }, [marker]);

  return (
    <div className="mixed-chart">
      <div className={classes.chartFlex}>
        <div className={classes.rangesContainer}>
          <div
            className={classes.ranges}
            style={{
              height: `${ranges?.high}%`,
              backgroundColor: '#ef3e4a',
            }}
          >
            H
          </div>
          <div
            className={classes.ranges}
            style={{
              height: `${ranges?.normal}%`,
              backgroundColor: '#17c37b',
            }}
          >
            N
          </div>
          <div
            className={classes.ranges}
            style={{
              height: `${ranges?.low}%`,
              backgroundColor: '#ef3e4a',
            }}
          >
            L
          </div>
        </div>
        <div className={classes.chartContainer}>
          <Chart
            options={options}
            series={series}
            type="line"
            width="100%"
            height="250px"
          />
        </div>
      </div>
    </div>
  );
};

export default Charts;

const useStyles = makeStyles({
  chartFlex: {
    display: 'flex',
    alignItems: 'center',
  },
  rangesContainer: {
    width: '16px',
    display: 'flex',
    alignSelf: 'stretch',
    flexDirection: 'column',
    marginBottom: '48px',
    marginTop: '25px',
  },
  ranges: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    color: '#fff',
    fontSize: '10px',
  },
  chartContainer: {
    width: 'calc(100% - 24px)',
  },
});
