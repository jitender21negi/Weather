import { TestBed, inject, getTestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherService } from './weather.service';
import { HttpModule } from '@angular/http';

describe('WeatherService', () => {
    let myserv, httpBackend;
    let service: WeatherService;
    let fixture: ComponentFixture<WeatherService>;
    let testService: WeatherService;
    let mockPaste = [
        { "coord": { "lon": -73.99, "lat": 40.73 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "base": "stations", "main": { "temp": 275.87, "pressure": 1038, "humidity": 100, "temp_min": 275.15, "temp_max": 276.15 }, "visibility": 16093, "wind": { "speed": 3.1, "deg": 110 }, "clouds": { "all": 90 }, "dt": 1519392900, "sys": { "type": 1, "id": 1969, "message": 0.0045, "country": "US", "sunrise": 1519385880, "sunset": 1519425659 }, "id": 5128581, "name": "New York", "cod": 200 }
    ]
    let list: any = [
        { id: 0, name: 'New York' },
        { id: 1, name: 'Texas' },
        { id: 2, name: 'Highlands County' },
        { id: 3, name: 'Bedford' },
        { id: 4, name: 'Los Angeles County' },
        { id: 5, name: 'Sprite' },
        { id: 6, name: 'Texas' },
        { id: 7, name: 'Illinois' },
        { id: 8, name: 'Grainfield' },
        { id: 9, name: 'Miami County' },
        { id: 10, name: 'Indiana' },
        { id: 11, name: 'Wellington' },
        { id: 12, name: 'Uniontown' },
        { id: 13, name: 'City and Borough of Birmingham' },
        { id: 14, name: 'Edgbaston' }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [WeatherService],
        });
        testService = TestBed.get(WeatherService);
    });
    afterEach(() => {
        service = null;
    });

    it('should defined service', inject([WeatherService], (service: WeatherService) => {
        expect(service).toBeTruthy();
    }));

    it('should get json', inject([WeatherService], (service: WeatherService) => {
        service.currentWeather('New York').subscribe(res => {
            expect(res).toEqual(mockPaste);
        })
        expect(service).toBeTruthy();
    }));

    it('should give error if city is not matched', inject([WeatherService], (service: WeatherService) => {
        service.currentWeather('Wrong city').subscribe(res => {
            console.log(res);
            expect('undefined').toEqual(list);
        })
        expect(service).toBeTruthy();
    }));

});
