import React from "react";
import { StyleSheet, View, Button } from "react-native";
import {
  alturaSD3neg,
  alturaSD2neg,
  alturaSD0,
  alturaSD2,
  alturaSD3,
  pesoSD3neg,
  pesoSD2neg,
  pesoSD0,
  pesoSD2,
  pesoSD3,
} from "../utils/const";
import HighchartsReactNative from "@highcharts/highcharts-react-native";
import {
  Grid,
  Col,
  Row,
  Input,
  Tab,
  Tabs,
  TabHeading,
  Text,
  Container,
  Content,
  FooterTab,
  Footer,
} from "native-base";

class ChildChartScreen extends React.Component {
  constructor(props) {
    // console.log("ChildChartScreen:PROPS:", props);
    super(props);

    this.state = {
      initialPage: 1,
      tabactivo: 1,
      pesoCorrecto: false,
      estaturaCorrecta: false,
      alturaChartOptions: {
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },
        yAxis: {
          title: {
            text: "Estatura(cm)",
          },
        },
        xAxis: {
          title: {
            text: "(días)",
          },
          type: "date",
          labels: {
            overflow: "justify",
          },
        },
        chart: {
          scrollablePlotArea: {
            minWidth: 700,
            scrollPositionX: 0,
          },
          zoomType: "x",
        },
        legend: {
          layout: "vertical",
          align: "center",
          verticalAlign: "middle",
          itemDistance: 30,
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: true,
            },
            pointStart: 0,
            connectNulls: true,
            marker: { symbol: "circle", enabledThreshold: 1 },
          },
        },
        series: [
          {
            name: "SD3neg",
            data: alturaSD3neg,
            color: "#000000",
          },
          {
            name: "SD2neg",
            data: alturaSD2neg,
            color: "#FF0000",
          },
          {
            name: "SD0",
            data: alturaSD0,
            color: "#56FF9A",
          },
          {
            name: "SD2",
            data: alturaSD2,
            color: "#FF0000",
          },
          {
            name: "SD3",
            data: alturaSD3,
            color: "#000000",
          },
          {
            name: props.route.params.nombre,
            data: props.route.params.historicoEstatura,
            color: "#1C96A3",
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "top",
                },
              },
            },
          ],
        },
      },
      pesoChartOptions: {
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },
        yAxis: {
          title: {
            text: "Peso(kg)",
          },
        },
        xAxis: {
          title: {
            text: "(días)",
          },
          type: "date",
          labels: {
            overflow: "justify",
          },
        },
        chart: {
          scrollablePlotArea: {
            minWidth: 700,
            scrollPositionX: 0,
          },
          zoomType: "x",
        },
        legend: {
          layout: "vertical",
          align: "center",
          verticalAlign: "middle",
          itemDistance: 30,
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: true,
            },
            pointStart: 0,
            connectNulls: true,
            marker: { symbol: "circle", enabledThreshold: 1 },
          },
        },
        series: [
          {
            name: "SD3neg",
            data: pesoSD3neg,
            color: "#000000",
          },
          {
            name: "SD2neg",
            data: pesoSD2neg,
            color: "#FF0000",
          },
          {
            name: "SD0",
            data: pesoSD0,
            color: "#56FF9A",
          },
          {
            name: "SD2",
            data: pesoSD2,
            color: "#FF0000",
          },
          {
            name: "SD3",
            data: pesoSD3,
            color: "#000000",
          },
          {
            name: props.route.params.nombre,
            data: props.route.params.historicoPeso,
            color: "#1C96A3",
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "top",
                },
              },
            },
          ],
        },
      },
    };
  }

  async componentDidMount() {
    this.checkParams();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("TEST:prevProps:", prevProps);
  }

  checkParams() {
    const { lastRegistroEstatura, lastRegistroPeso } = this.props.route.params;
    // const { navigation } = this.props;
    // const lastRegistroEstatura = navigation.getParam("lastRegistroEstatura");
    // const lastRegistroPeso = navigation.getParam("lastRegistroPeso");
    this.validEstaturaPesoChild(lastRegistroEstatura, lastRegistroPeso);
    console.log("TEST:lastRegistroEstatura:", lastRegistroEstatura);
    console.log("TEST:lastRegistroPeso:", lastRegistroPeso);
  }

  validEstaturaPesoChild(estaturaRecord, pesoRecord) {
    let EstaturaRecordSD2 = alturaSD2[estaturaRecord.index];
    let EstaturaRecordSD2neg = alturaSD2neg[estaturaRecord.index];

    if (
      EstaturaRecordSD2neg < estaturaRecord.value &&
      estaturaRecord.value < EstaturaRecordSD2
    ) {
      this.setState({ estaturaCorrecta: true });
    }

    let PesoRecordSD2 = pesoSD2[pesoRecord.index];
    let PesoRecordSD2neg = pesoSD2neg[pesoRecord.index];

    if (
      PesoRecordSD2neg < pesoRecord.value &&
      pesoRecord.value < PesoRecordSD2
    ) {
      this.setState({ pesoCorrecto: true });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Tabs
          locked
          tabContainerStyle={{ height: 40 }}
          tabBarUnderlineStyle={{
            backgroundColor: "white",
            height: 5,
          }}
          initialPage={this.state.initialPage}
          page={this.state.tabactivo}
        >
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#A4D4DB" }}>
                <Text
                  style={{ fontSize: 15, color: "white" }}
                  onPress={() => {
                    this.setState({ tabactivo: 0 });
                  }}
                >
                  Peso
                </Text>
              </TabHeading>
            }
          >
            <Container>
              <Content>
                <HighchartsReactNative
                  styles={styles.container}
                  options={this.state.pesoChartOptions}
                  useCDN={true}
                />
                {this.props.route.params.historicoPeso.length > 0 ? (
                  <Grid>
                    {this.state.pesoCorrecto ? (
                      <Row style={{ backgroundColor: "#75d98f" }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: "#FFF",
                            width: 350,
                            textAlign: "center",
                            textAlignVertical: "center",
                            padding: 6,
                          }}
                        >
                          ¡Felicitaciones! Peso dentro del rango normal de
                          crecimiento.
                        </Text>
                      </Row>
                    ) : (
                      <Row style={{ backgroundColor: "#d97575" }}>
                        <Text
                          style={{
                            fontSize: 14,
                            padding: 6,
                            color: "#FFF",
                            width: 350,
                            textAlign: "center",
                            textAlignVertical: "center",
                          }}
                        >
                          ¡Alerta! Peso fuera del rango normal de crecimiento.
                        </Text>
                      </Row>
                    )}
                  </Grid>
                ) : null}
              </Content>
            </Container>
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#A4D4DB" }}>
                <Text
                  style={{ fontSize: 15, color: "white" }}
                  onPress={() => {
                    this.setState({ tabactivo: 1 });
                  }}
                >
                  Estatura
                </Text>
              </TabHeading>
            }
          >
            <Container>
              <Content>
                <HighchartsReactNative
                  styles={styles.container}
                  options={this.state.alturaChartOptions}
                  useCDN={true}
                />
                {this.props.route.params.historicoEstatura.length > 0 ? (
                  <Grid>
                    {this.state.estaturaCorrecta ? (
                      <Row style={{ backgroundColor: "#75d98f" }}>
                        <Text
                          style={{
                            fontSize: 14,
                            padding: 6,
                            color: "#FFF",
                            width: 350,
                            textAlign: "center",
                            textAlignVertical: "center",
                          }}
                        >
                          ¡Felicitaciones! Estatura dentro del rango normal de
                          crecimiento.
                        </Text>
                      </Row>
                    ) : (
                      <Row style={{ backgroundColor: "#d97575" }}>
                        <Text
                          style={{
                            fontSize: 14,
                            padding: 6,
                            color: "#FFF",
                            width: 350,
                            textAlign: "center",
                            textAlignVertical: "center",
                          }}
                        >
                          ¡Alerta! Estatura fuera del rango normal de
                          crecimiento.
                        </Text>
                      </Row>
                    )}
                  </Grid>
                ) : null}
              </Content>
            </Container>
          </Tab>
        </Tabs>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 638,
    // height: 200,
    backgroundColor: "#fff",
    justifyContent: "center",
    flex: 1,
  },
});
export default ChildChartScreen;
