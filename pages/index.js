import 'react-datepicker/dist/react-datepicker.css';
import Form from '../components/Form';
import Pages from '../models/Pages';
import dbConnect from '../utils/dbConnect';
import { ResponsiveLine } from '@nivo/line';

export default function Home({ pages }) {
  var todayDate = new Date().toISOString().slice(0, 10);
  const pagesForm = {
    day: todayDate,
    pages: 0,
  };

  let chartData = [{ id: '', data: [] }];
  pages.forEach((item) => {
    chartData[0].data.push({
      x: item.day,
      y: item.pages,
    });
  });

  return (
    <div className="container">
      <nav>
        <h2>Read More</h2>
      </nav>
      <main>
        <Form formId="new-entry-form" pagesForm={pagesForm} />
        <div className="chart">
          <ResponsiveLine
            data={chartData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: '',
              legendOffset: 36,
              legendPosition: 'middle',
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'count',
              legendOffset: -40,
              legendPosition: 'middle',
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </main>
    </div>
  );
}

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await Pages.find({});
  const prePages = result.map((doc) => {
    const prePages = doc.toObject();
    prePages._id = prePages._id.toString();
    return prePages;
  });

  let pages = prePages.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.day) - new Date(b.day);
  });

  return { props: { pages: pages } };
}
