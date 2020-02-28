import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { delay } from 'rxjs/operators';
import { of } from 'rxjs';

import { DatasourceProperties } from '@models/datasource-properties';

import { DataSourcePropertiesComponent } from './data-source-properties.component';

describe('DataSourcePropertiesComponent', () => {
  let component: DataSourcePropertiesComponent;
  let fixture: ComponentFixture<DataSourcePropertiesComponent>;

  const networkDelay = 1500;
  const datasourceProperties: DatasourceProperties = {
    jdbcUrl: 'jdbc:h2',
    username: 'jdbc_username',
    flywayPath: 'db/migration/primary',
    showSql: true,
    showStats: true
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSourcePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourcePropertiesComponent);
    component = fixture.componentInstance;

    component.datasourceProperties$ = of(datasourceProperties).pipe(delay(networkDelay));
  });

  it('should show the datasource properties', fakeAsync(() => {
    fixture.detectChanges();

    const configPropsTable = fixture.debugElement.query(By.css('#config-props-table'));
    expect(configPropsTable).toBeTruthy('config props table');

    const configPropsTableHeaders = configPropsTable.queryAll(By.css('th'));
    expect(configPropsTableHeaders.length).toBe(5, 'number of headers');

    let i = 0;
    expect(configPropsTableHeaders[i++].nativeElement.textContent.trim()).toBe('URL');
    expect(configPropsTableHeaders[i++].nativeElement.textContent.trim()).toBe('Username');
    expect(configPropsTableHeaders[i++].nativeElement.textContent.trim()).toBe('Flyway');
    expect(configPropsTableHeaders[i++].nativeElement.textContent.trim()).toBe('Show SQL');
    expect(configPropsTableHeaders[i++].nativeElement.textContent.trim()).toBe('Statistics');

    const configPropTableLoadingDatas = configPropsTable.queryAll(By.css('td'));
    expect(configPropTableLoadingDatas.length).toBe(5, 'number of table data');
    for (const configPropTableLoadingData of configPropTableLoadingDatas) {
      expect(configPropTableLoadingData.nativeElement.textContent.trim()).toBe('...');
    }

    tick(networkDelay);
    fixture.detectChanges();

    const configPropTableDatas = configPropsTable.queryAll(By.css('td'));
    expect(configPropTableDatas.length).toBe(5, 'number of table data');

    i = 0;
    expect(configPropTableDatas[i++].nativeElement.textContent.trim()).toBe(datasourceProperties.jdbcUrl);
    expect(configPropTableDatas[i++].nativeElement.textContent.trim()).toBe(datasourceProperties.username);
    expect(configPropTableDatas[i++].nativeElement.textContent.trim()).toBe(datasourceProperties.flywayPath);
    expect(configPropTableDatas[i++].nativeElement.textContent.trim()).toBe(datasourceProperties.showSql + '');
    expect(configPropTableDatas[i++].nativeElement.textContent.trim()).toBe(datasourceProperties.showStats + '');
  }));
});