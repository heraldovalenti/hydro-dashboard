export default {
  page_header_title: 'AES',
  page_header_text: 'Plan de Manejo de Embalses',

  loading_icon_label: 'cargando...',

  page_loading_no_data_title: 'Cargando datos',
  page_loading_no_data_subtitle:
    'Dame unos momentos para que cargue los datos desde el servidor',

  pagination_all_elements: 'Todos',

  control_panel_title: 'Panel de Control',

  control_panel_styles_title: 'Estilo de mapa',
  control_panel_styles_roadmap: 'Natural',
  control_panel_styles_night_map: 'Nocturno',
  control_panel_styles_desert_map: 'Desierto',

  control_panel_layers_title: 'Capas del mapa',
  control_panel_layers_hydro_metric_stations: 'Estaciones hidrométricas',
  control_panel_layers_weather_stations: 'Estaciones meteorológicas',
  control_panel_layers_streams: 'Cauces',
  control_panel_layers_basins: 'Cuencas',
  control_panel_layers_empty_stations: 'Ocultar estaciones sin datos',

  control_panel_layers_basins_filter_title: 'Cuencas visibles',
  control_panel_layers_basins_filter_item: 'Cuenca {{basin}}',

  control_panel_layers_streams_filter_title: 'Cauces visibles',
  control_panel_layers_streams_filter_item: '{{stream}}',

  control_panel_filters_title: 'Intervalo de tiempo',
  control_panel_filters_last_0_hours: 'Personalizado',
  control_panel_filters_last_1_hours: 'Última hora',
  control_panel_filters_last_3_hours: 'Últimas 3 horas',
  control_panel_filters_last_6_hours: 'Últimas 6 horas',
  control_panel_filters_last_12_hours: 'Últimas 12 horas',
  control_panel_filters_last_24_hours: 'Últimas 24 horas',
  control_panel_filters_last_48_hours: 'Últimas 48 horas',
  control_panel_filters_last_168_hours: 'Última semana',
  control_panel_filters_from: 'Desde',
  control_panel_filters_to: 'Hasta',
  control_panel_filters_interval_title: 'Selección de intervalo de tiempo',
  control_panel_invalid_date_message: 'Formato de fecha no válido',

  control_panel_rasters_title: 'Rasters',
  control_panel_rasters_show: 'Visualizar en mapa',
  control_panel_rasters_opacity: 'Opacidad',
  control_panel_rasters_model_wrf: 'WRF',
  control_panel_rasters_model_sqpe: 'SQPE',
  control_panel_rasters_model_acum: 'Acumulado',

  rain_info_summary:
    'Acumulado en las últimas {{hours}} horas: {{accumulation}} {{unit}}',
  level_info_summary: 'Mediciones de nivel en las últimas {{hours}} horas',
  flow_info_summary: 'Mediciones de caudal en las últimas {{hours}} horas',
  flow_info_summary_hq_model:
    'Caudal en las últimas {{hours}} horas (estimado mediante modelo H-Q)',

  station_table_title: 'Estaciones',
  station_table_header_id: 'ID',
  station_table_header_description: 'Descripción',
  station_table_header_latitude: 'Latitud',
  station_table_header_longitude: 'Longitud',
  station_table_header_active: 'Activa',
  station_table_header_origin: 'Origen',

  station_info_header_datetime: 'Fecha y hora',
  station_info_header_value: 'Valor observado',
  station_info_header_unit: 'Unidad',
  station_info_link_description: 'Ver origen de datos en {{origin}}',

  auth_form_username_label: 'Nombre de usuario',
  auth_form_password_label: 'Contraseña',
  auth_form_wrong_credentials_message:
    'Nombre de usuario o contraseña inválidos',
  auth_form_login_button: 'Iniciar sesión',
  auth_form_logout_button: 'Cerrar sesión',

  forecast_page_title: 'Pronósticos',
  forecast_page_subtitle: 'Fecha de actualización: {{date}}',
  forecast_page_provider: 'Proveedor',
  forecast_page_detail_no_data: 'S/D',

  city_salta: 'Ciudad de SALTA',
  'city_coronel-moldes': 'Ciudad de CORONEL MOLDES',
  city_cafayate: 'Ciudad de CAFAYATE',
  city_metan: 'Ciudad de METÁN',

  app_config_aes_title: 'Configuraciones AES',
  app_config_aes_label_auth_token_fed_auth: 'Token FedAuth para OneDrive',
  app_config_aes_label_auth_token_rt_fa: 'Token rtFa para OneDrive',
  app_config_aes_action_health_check: 'Verificar conexión',
  app_config_aes_action_update_observations: 'Actualizar datos de OneDrive',
};
